package keeper_test

import (
	"testing"

	testkeeper "blogForClient/testutil/keeper"
	"blogForClient/x/blogforclient/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.BlogforclientKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
