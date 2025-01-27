import { supabase } from "./client.ts";

type Provider =
  | "evm"
  | "tron"
  | "substrate"
  | "solana"
  | "google"
  | "facebook"
  | "github";

type AccountType = "web2" | "web3";

type IdentifierType =
  | "email"
  | "eth_address"
  | "substrate_address"
  | "tron_address"
  | "solana_address"
  | "username";

// be done automatically, changed frequently
interface Account {
  id?: any; // uuid
  user_id: string; // profile/user Id
  provider: Provider; // 'evm', 'tron', 'substrate', 'solana', 'google', 'facebook', 'github', "any", "biconomy"
  account_type: AccountType; // 'web2' | 'web3'
  identifier: string; // e.g. 0x, Tx, some@email.com
  identifier_type: IdentifierType; // 'email' | 'eth_address' | 'substrate_address' | 'tron_address' | 'solana_address'
}

// LinkAccount

// create user -> will interact with user
interface UserProfile {
  //
  username: string;
  name: string;
  email: string;
  id: string; // user_id uuid
  accounts: Account[];
}

// export async function testSupabase() {
//     console.log('supaabse', SUPABASE_URL, )
// }

// find users
export async function userExists(filters: {
  [key: string]: any;
}): Promise<UserProfile | null> {
  let query = supabase.from("users").select("*");

  // Loop through the filters and apply them to the query
  for (const [key, value] of Object.entries(filters)) {
    if (key === "accounts") {
      // Special case: If the filter key is 'accounts' (JSONB array), use `.contains()` to check if the account exists in the array
      query = query.contains("accounts", [value]); // Match accounts with the specified value

      // Special case: If the filter key is 'accounts' (JSONB array), use jsonb_array_elements to unpack the array
      // and apply the search to the specific properties (provider and identifier).
      // This assumes the 'accounts' array contains objects like { provider: "google", identifier: "user@example.com" }

      // query = query
      //     .filter('accounts', 'jsonb_array_elements', `@> '[{"provider": "${value.provider}", "identifier": "${value.identifier}"}]'`)
      //     .or(`accounts->>provider.eq.${value.provider},accounts->>identifier.eq.${value.identifier}`);

      // GIN Index Example:
      // You can create an index on the accounts JSONB column in Supabase (PostgreSQL) to optimize searches:
      // CREATE INDEX accounts_gin_idx ON users USING gin (accounts jsonb_path_ops);
    } else {
      // For other fields like username, id, name, apply equality check
      query = query.eq(key, value);
    }
  }

  // Execute the query
  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to check user existence: ${error.message}`);
  }

  // Return the matching users (can be an array of users)
  return data;
}

// find accounts in flexible way
// const exists = await accountExists({
//     provider: 'google',
//     identifier_type: 'email',
//     identifier: 'user@example.com'
// });
// const exists = await accountExists({
//     provider: 'google',
//     identifier: 'user@example.com'
// });
export async function accountExists(filters: {
  [key: string]: any;
}): Promise<Account[] | null> {
  // Build the query dynamically based on the filters provided
  let query = supabase.from("accounts").select("*");

  // Loop through the filters and apply them to the query
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }

  // Execute the query
  const { data, error } = await query;
  // .single();
  console.log(error, "error");
  console.log(data, "data");

  if (error) {
    throw new Error(`Failed to check account existence: ${error.message}`);
  }

  return !!data?.length ? data : null; // Returns true if account exists
}

// create account + link to user-profile and return userId
export async function registerAccountUser(
  provider: Provider,
  accountType: AccountType,
  identifier: string,
  identifierType: IdentifierType
): Promise<UserProfile | any> {
  // 1. First, check if an account already exists for the given provider and identifier
  const existingAccountByProvider = await accountExists({
    provider,
    identifier,
  });

  // 2a. Handle case when account already exists for provider and identifier
  if (existingAccountByProvider) {
    throw new Error(
      `Account already exists for provider ${provider} with identifier ${identifier}`
    );
  }

  // If not found by provider, continue checking by identifier type
  let userId: string | null = null;

  // 2b. Check if the identifier is an email and account exists by email
  if (identifierType === "email") {
    const existingAccountByEmail = await accountExists({
      identifier_type: identifierType,
      identifier,
    });

    if (existingAccountByEmail) {
      // 3. Extract userId from the first account found
      userId = existingAccountByEmail[0]?.user_id; // `user_id` is expected to be part of the data
    }
  }

  // 2c. Create a user if no userId is found
  if (!userId) {
    let email = identifierType === "email" ? identifier : null;

    try {
      const createdUser = await createUser(identifier, email, provider);
      userId = createdUser?.id || null;
    } catch (error) {
      console.error("Failed to create user:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }
  }

  // Check if userId is still null, if so, throw an error (it cannot be null here)
  if (userId === null) {
    throw new Error("Failed to determine a valid user ID.");
  }

  // 3. Now proceed to create the account
  const newAccount = await createAccount(
    {
      userId,
      provider,
      accountType,
      identifier,
      identifierType,
    },
    true
  );

  // 4. Link the user to the account
  const linkAccountUser = await linkUser(
    userId, // userId should never be null at this point
    newAccount,
    true
  );

  // Return the linked user data
  return linkAccountUser; // Return the updated user data: { accounts: [...], name, username, etc }
}

// only create account
export async function createAccount(
  { userId, provider, accountType, identifier, identifierType },
  skipCheck = false
) {
  // Step 1: Check if the account already exists for the provider and identifier
  if (!skipCheck) {
    const existingAccount = await accountExists({ provider, identifier });

    if (existingAccount) {
      // Reject if the account already exists
      throw new Error(
        `Account already exists for provider ${provider} with identifier ${identifier}`
      );
    }
  }

  // Step 2: create account to get the Id, userId will be null
  const { data: accountData, error: accountError } = await supabase
    .from("accounts")
    .insert([
      {
        user_id: userId, //should refer to userId
        provider,
        account_type: accountType,
        identifier,
        identifier_type: identifierType,
      },
    ])
    .select();

  console.log(accountData, accountError, "account creation");

  if (accountError) {
    throw new Error(`Failed to register account: ${accountError.message}`);
  }

  return accountData[0]; // Return the newly created account
}

export async function createUser(
  username, // usually identifier
  email,
  firstAccountProvider
) {
  console.log("Starting to create user with:", {
    username,
    email,
    firstAccountProvider,
  });

  try {
    // Create user
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([
        {
          username,
          email,
          first_account_provider: firstAccountProvider,
          phone: null,
          profile_picture: null,
          full_name: null,
          accounts: [], // Initially empty array for linked accounts
        },
      ])
      .select();

    if (userError) {
      console.error("Error creating user:", userError);
      throw new Error(`Failed to create user: ${userError.message}`);
    }

    console.log("User created successfully:", userData, userError);

    // Check if we got valid data
    if (userData && userData.length > 0) {
      return userData[0]; // Return the first user data
    } else {
      console.error("No data returned after inserting user.");
      return null;
    }
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error; // Re-throw the error if necessary
  }
}

// link user and return the updated data back
export async function linkUser(
  userId: string,
  account: any,
  returnUserData: boolean = false
): Promise<UserProfile | boolean> {
  // 1. Call the RPC function to update the user record by adding the new account
  const { error: rpcError } = await supabase.rpc("append_account_to_user", {
    user_id: userId, // Pass the userId
    new_account: account, // Pass the new account object to append
  });

  if (rpcError) {
    throw new Error(`Failed to link user with account: ${rpcError.message}`);
  }

  // 2. If `returnUserData` is true, fetch and return the updated user record
  if (returnUserData) {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*") // Select all columns (or specific columns if you prefer)
      .eq("id", userId); // Match the user by userId

    if (userError) {
      throw new Error(`Failed to fetch updated user: ${userError.message}`);
    }

    return userData[0]; // Return the updated user data
  }

  // If not returning user data, return true to indicate success
  return true;
}

export async function unlinkUser(
  userId: number,
  account: any,
  returnUserData: boolean = false
): Promise<UserProfile | boolean> {
  // 1. Call the RPC function to update the user record by removing the account
  const { error: rpcError } = await supabase.rpc("remove_account_from_user", {
    user_id: userId, // Pass the userId
    account_to_remove: account, // Pass the account object to remove
  });

  if (rpcError) {
    throw new Error(`Failed to unlink user from account: ${rpcError.message}`);
  }

  // 2. If `returnUserData` is true, fetch and return the updated user record
  if (returnUserData) {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*") // Select all columns (or specific columns if you prefer)
      .eq("id", userId); // Match the user by userId

    if (userError) {
      throw new Error(`Failed to fetch updated user: ${userError.message}`);
    }

    return userData[0]; // Return the updated user data
  }

  // If not returning user data, return true to indicate success
  return true;
}

// // link account to user-profile
// // similar, but this is extra check
// export async function linkAccount({ userId, provider, accountType, identifier, identifierType }, skipCheck = false) {

//     // Step 1: Check if the account already exists for the provider and identifier
//     if (!skipCheck) {
//         const existingAccount = await accountExists(provider, identifier);

//         if (existingAccount) {
//             // Reject if the account already exists
//             throw new Error(`Account already exists for provider ${provider} with identifier ${identifier}`);
//         }
//     }

//     // // Step 2: link to the existing userId
//     // const { data: accountData, error: accountError } = await supabase
//     //     .from('accounts')
//     //     .insert([{
//     //         user_id: userId,  // Use the existing user ID
//     //         provider,
//     //         account_type: accountType,
//     //         identifier,
//     //         identifier_type: identifierType
//     //     }]);

//     // if (accountError) {
//     //     throw new Error(`Failed to link account: ${accountError.message}`);
//     // }

//     // return accountData[0];  // Return the newly created account
// }

// export async function registerUser(email, username) {
//     // Insert the user into the users table with default fields
//     const { data: userData, error: userError } = await supabase
//         .from('users')
//         .insert([{
//             email,
//             username,
//             phone: null,        // Default empty or null
//             business_email: null, // Default empty or null
//             profile_picture: null // Default empty or null
//         }]);

//     if (userError) {
//         throw new Error(`Failed to register user: ${userError.message}`);
//     }

//     return userData[0];  // Return the newly created user profile
// }

export async function updateUser() {
  // // update
  // // Insert the user into the users table with default fields
  // const { data: userData, error: userError } = await supabase
  //     .from('users')
  //     .insert([{
  //         email,
  //         username,
  //         phone: null,        // Default empty or null
  //         business_email: null, // Default empty or null
  //         profile_picture: null // Default empty or null
  //     }]);
  // if (userError) {
  //     throw new Error(`Failed to register user: ${userError.message}`);
  // }
  // return userData[0];  // Return the newly created user profile
}

export async function getUserProfile(userId) {
  // Query the user profile from the users table
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single(); // Get single user profile by ID

  if (userError) {
    throw new Error(`Failed to get user profile: ${userError.message}`);
  }

  // Query the linked accounts from the accounts table
  const { data: linkedAccountsData, error: accountsError } = await supabase
    .from("accounts")
    .select("*") // all related
    .eq("user_id", userId); // Get all accounts linked to the user ID

  if (accountsError) {
    throw new Error(`Failed to get linked accounts: ${accountsError.message}`);
  }

  // Construct the user profile with linked accounts
  const userProfile = {
    ...userData,
    linkedAccounts: linkedAccountsData, // Directly use the linked accounts data
  };

  return userProfile;
}

// // login + registration
// export async function handleConnect(provider, accountType, identifier, identifierType) {
//     // Step 1: Check if the account exists
//     const existingAccount = await accountExists(provider, identifier);

//     if (existingAccount) {
//         // If the account exists, retrieve and return user info and linked accounts
//         const userId = existingAccount.user_id;
//         const userProfile = await getUserProfile(userId); // Function to get user profile and linked accounts
//         return { user: userProfile, account: existingAccount };
//     } else {
//         // Step 2: Register the user (create user profile)
//         let email = null;
//         let username = null;

//         // Determine email and username based on the provider
//         if (accountType === 'web2') { // Function to check if provider is web2
//             email = identifier; // Assuming identifier is email for web2 providers
//         // } else {
//         //     // Use username if it exists; otherwise, null
//         //     username = await getAvailableUsername(); // Function to get an available username
//         }

//         const newUser = await registerUser(email, username); // Call with determined email and username

//         // Step 3: Register the account using the new user's ID
//         const newAccount = await registerAccount(newUser.id, provider, accountType, identifier, identifierType);

//         return { user: newUser, account: newAccount };
//     }
// }
