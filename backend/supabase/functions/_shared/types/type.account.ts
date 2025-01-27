// Core types for authentication and platform identification
export type Provider =
  | "evm" // Ethereum/EVM chains (Metamask, etc.)
  | "tron" // Tron blockchain
  | "substrate" // Polkadot/Substrate
  | "solana" // Solana
  | "twitter"
  | "youtube"
  | "tiktok"
  | "docusign"
  | "biconomy"
  | "instagram"
  | "linkedin"
  | "threads"
  | "facebook"
  | "mastodon"
  | "bluesky";
// | "snapchat"
// | "reddit"
// | "twitch"
// | "discord"
// | "telegram"
// | "pinterest"
// | "discord"
// | "spotify"
// | "apple"
// | "google"
// | "microsoft"
// | "amazon"
// | "netflix"
// | "hulu"
// | "disney"
// | "peacock";

export type AccountType = "web2" | "web3";

// Represents a single connected account (social or blockchain)
export interface Account {
  // Unique identifier combining platform and platform-specific ID
  // Format: `${platform}_${platformSpecificId}`
  // Examples:
  // - youtube_UCxxx (YouTube channel ID)
  // - evm_0x1234  (Ethereum address)
  // - twitter_12345 (Twitter user ID)
  id: string;

  // References the LinkAccount this belongs to
  link_id: string;

  // The platform/provider this account is from
  provider: Provider;

  // Whether this is a Web2 or Web3 account
  account_type: AccountType;

  // Authentication details
  auth: {
    // The access token for API calls
    access_token: string;

    // Optional refresh token if the platform provides one
    refresh_token?: string;

    // When the access token expires
    expires_at?: Date;

    // How the user authenticated with this platform
    // Examples: 'email', 'google', 'apple', 'metamask', etc.
    auth_method: string;
  };

  // Basic account info
  email?: string;
  name?: string;

  // When this account was last synced with the platform
  last_synced_at: Date;

  // For tracking creation/updates
  created_at: Date;
  updated_at: Date;
}

export interface AccountLog {
  // The account that was linked/unlinked
  account_id: string;
  provider: Provider;

  // Basic account info at time of logging
  email?: string;
  name?: string;

  // Action performed
  action: "linked" | "unlinked" | "updated";

  // Optional profile info at time of action
  profile_id?: string; // We include this but keep it optional
  username?: string;

  // Metadata about the action
  reason?: string; // e.g., "user_initiated", "token_expired", "system_cleanup"

  // Timestamps
  created_at: Date;
}

// Groups multiple accounts that belong to the same user
export interface AccountGroup {
  id: string;

  // All connected accounts
  account_ids: string[];
  profile_ids: string[];

  // Historical log of all account actions
  account_logs: AccountLog[];

  // Metadata about this group of accounts
  metadata: {
    // Status flags
    is_banned?: boolean;
    is_verified?: boolean;

    // Delegation settings
    delegation_details?: {
      delegated_to?: string;
      delegation_type?: string;
      expires_at?: Date;
    };

    // Custom fields
    [key: string]: any;
  };

  // Activity tracking
  created_at: Date;
  updated_at: Date;
}

// Profile information synced from platforms
export interface UserProfile {
  // Unique identifier combining platform and username/handle
  // Format: `${platform}_${username}`
  // Examples: youtube_pewdiepie, twitter_elonmusk
  id: string;

  // References parent account
  account_id: string;
  link_id: string;

  // Core profile data
  username: string;
  display_name: string;
  email?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;

  // Platform-specific usernames (e.g. ENS, Lens handle)
  platform_usernames: {
    platform: string;
    username: string;
  }[];

  // Additional platform-specific data
  platform_specifics: {
    // // YouTube specific fields
    // youtube?: {
    //   subscriber_count?: number;
    //   video_count?: number;
    //   channel_type?: string;
    // };

    // // Twitter specific fields
    // twitter?: {
    //   follower_count?: number;
    //   verified?: boolean;
    //   tweet_count?: number;
    // };

    // Add other platform-specific data as needed
    [key: string]: any;
  };

  // Version for tracking profile updates
  version: number;

  // Timestamps
  last_synced_at: Date;
  created_at: Date;
  updated_at: Date;
}
// // be done automatically, changed frequently due to refresh_token
// interface Account {
//   id?: any; // -> defined by socialId with platform_IDSOCIAL -> youtube_IDyoutubeAccount, docusign_IDdocusignAccc, twitter_IDtwitterAcc, or 0xEVM_ADDRESS... , TxTRON_ADDRESS
//   link_id: string; //
//   provider: Provider; // this is a social account login provider ->  'evm' (usually metamask), 'tron', 'substrate', 'solana', 'twitter', 'youtube', 'tiktok', "docusign", "biconomy"
//   account_type: AccountType; // 'web2' | 'web3' //
//   // identifier: string; // the real unique idenfitifaction @bobby @bono etc -> e.g. 0x0000... (evm_address), Tx000... (tron-address) , some@email.com (email if by email or google-provider/github-provider etc), @handler (username/handler) --> BUT DO WE NEED IT ? since it is same like id right?
//   // identifier_type: IdentifierType; // 'email' | 'eth_address' | 'substrate_address' | 'tron_address' | 'solana_address'
//   login_by: string; // should we state login by auth0 provider? such as twitter can do login handler, email, google-provider, apple-account, etc ?

//   account_email?: string;
//   account_name?: string;
//   access_token: string;
//   refresh_token?: string;
//   expires_at?: Date;
//   last_synced_at: Date; // same as updated_at ?? which naming better though? describing the renewal refresh token ? or we dont need it?
// }

// /// or tunnel (tunnel-link ?? )
// // LinkAccount -> even rarely change
// // and only system will edit and visible read from extension
// interface LinkAccount {
//   // show connected AccountLink
//   // array of UserAccount // -> profileID and
//   // last loggedIn
//   id: string; // some uuid
//   accounts: Account[];
//   metadata: {}; //some jsonb ?  -> can be anything to describe bann, notify, marking, or even delegation info later ?
//   // logs here // i want the logs stays here, even if user unlink
//   updated_at: Date;
// }

// // updated by user (but initally created by system) -> will interact with user
// // user need to manually refresh this if they edit their profile in the original platforms.
// // well they can edit it here too later but system will use original api to directly change it and automatically refresh once it done.
// interface UserProfile {
//   id: string; //  -> // if social_id has its own id then use it same like platform_IDSOCIAL or perhaps using handler ? platfrom_HANDLER -> youtube_PEWDIEPIE or youtube_IDPEWDIEPIE
//   username: string; // -> if wallet address then 0x... for now (until we integrate with lens)\
//   usernames: username[]; // if since  opensea and lens have different username in single wallet?
//   name: string;
//   email: string;
//   updated_at: Date; // original updated -> can be done in the system or original platforms
//   last_synced_at: Date; // the last time we synced the user profile here, because it can be done manually

//   platform_specifics: {}; // using jsonb ? for additional data by each profile-accounts because each social platform hahve their own architecture

//   display_name: string;
//   bio?: string;
//   location?: string;
//   avatar_url?: string;
//   version: number;
//   metadata: Record<string, any>;

//   link_id: string;
//   account_id: string; // is it necessary ??
// }
