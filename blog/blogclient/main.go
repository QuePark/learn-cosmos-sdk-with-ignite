package main

import (
	"context"
	"fmt"
	"log"

	"github.com/ignite/cli/ignite/pkg/cosmosclient"

	"blog/x/blog/types"
)

func main() {
	ctx := context.Background()
	addressPrefix := "cosmos"

	client, err := cosmosclient.New(ctx, cosmosclient.WithAddressPrefix(addressPrefix))
	if err != nil {
		log.Fatal(err)
	}

	accountName := "alice"

	account, err := client.Account(accountName)
	if err != nil {
		log.Fatal(err)
	}

	addr, err := account.Address(addressPrefix)
	if err != nil {
		log.Fatal(err)
	}

	msg := &types.MsgCreatePost{
		Creator: addr,
		Title:   "Hello World",
		Body:    "This is he first post from go client!",
	}

	txRes, err := client.BroadcastTx(ctx, account, msg)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("MsgCreatePost: \n\n")
	fmt.Println(txRes)

	queryClient := types.NewQueryClient(client.Context())

	queryRes, err := queryClient.PostAll(ctx, &types.QueryAllPostRequest{})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Print("\n\nAll posts: \n\n")
	fmt.Println(queryRes)
}
