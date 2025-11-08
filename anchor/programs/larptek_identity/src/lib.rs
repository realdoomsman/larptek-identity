use anchor_lang::prelude::*;

declare_id!("LarptEk111111111111111111111111111111111111");

#[program]
pub mod larptek_identity {
    use super::*;

    pub fn register_identity(ctx: Context<RegisterIdentity>, hash: [u8; 32]) -> Result<()> {
        let identity = &mut ctx.accounts.identity;
        require!(!identity.initialized, LarptekError::AlreadyRegistered);
        identity.wallet = ctx.accounts.authority.key();
        identity.hash = hash;
        identity.created_at = Clock::get()?.unix_timestamp;
        identity.initialized = true;
        Ok(())
    }

    pub fn update_identity(ctx: Context<UpdateIdentity>, new_hash: [u8; 32]) -> Result<()> {
        let identity = &mut ctx.accounts.identity;
        require!(identity.initialized, LarptekError::NotRegistered);
        require_keys_eq!(identity.wallet, ctx.accounts.authority.key(), LarptekError::Unauthorized);
        identity.hash = new_hash;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct RegisterIdentity<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        space = 8 + UserIdentity::SIZE,
        seeds = [b"identity", authority.key().as_ref()],
        bump
    )]
    pub identity: Account<'info, UserIdentity>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateIdentity<'info> {
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [b"identity", authority.key().as_ref()],
        bump
    )]
    pub identity: Account<'info, UserIdentity>,
}

#[account]
pub struct UserIdentity {
    pub wallet: Pubkey,
    pub hash: [u8; 32],
    pub created_at: i64,
    pub initialized: bool,
}

impl UserIdentity {
    pub const SIZE: usize = 32 + 32 + 8 + 1; // wallet + hash + created_at + initialized
}

#[error_code]
pub enum LarptekError {
    #[msg("Identity already registered for this wallet")] 
    AlreadyRegistered,
    #[msg("Identity not registered")] 
    NotRegistered,
    #[msg("Unauthorized")] 
    Unauthorized,
}
