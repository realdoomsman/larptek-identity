const anchor = require('@coral-xyz/anchor');
const { Program } = anchor;

describe('larptek_identity', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.LarptekIdentity;

  it('Builds', async () => {
    // Placeholder test to ensure workspace loads
  });
});
