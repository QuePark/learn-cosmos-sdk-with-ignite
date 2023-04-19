package blogforclient_test

import (
	"testing"

	keepertest "blogForClient/testutil/keeper"
	"blogForClient/testutil/nullify"
	"blogForClient/x/blogforclient"
	"blogForClient/x/blogforclient/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.BlogforclientKeeper(t)
	blogforclient.InitGenesis(ctx, *k, genesisState)
	got := blogforclient.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
