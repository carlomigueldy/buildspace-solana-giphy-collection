use anchor_lang::prelude::*;

declare_id!("39ZyRmpqhPUHfYnr2Z3DsToAzEnti56KEdrqS3HCVJAn");

#[program]
pub mod giphyportal {
    use super::*;
    pub fn initialize(_ctx: Context<Initialize>) -> ProgramResult {
        let base_account = &mut _ctx.accounts.base_account;

        base_account.total_gifs = 0;

        Ok(())
    }

    // The fucntion now accepts a gif_link param from the user.
    pub fn add_gif(ctx: Context<AddGif>, _gif_link: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;

        // Build the struct.
        let item = ItemStruct {
            gif_link: _gif_link.to_string(),
            user_address: *base_account.to_account_info().key,
        };

        // Add it to the gif_list vector.
        base_account.gif_list.push(item);
        base_account.total_gifs += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Specify what data you want in the AddGif Context.
// Getting a handle on the flow of things :)?
#[derive(Accounts)]
pub struct AddGif<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

// Create a custom struct for us to work with.
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub gif_link: String,
    pub user_address: Pubkey,
}

#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
    pub gif_list: Vec<ItemStruct>,
}
