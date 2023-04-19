package keeper_test

import (
	"context"
	"testing"

	keepertest "blogForClient/testutil/keeper"
	"blogForClient/x/blogforclient/keeper"
	"blogForClient/x/blogforclient/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.BlogforclientKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
