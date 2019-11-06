BRANCH=$1
INFURA_API_URL=$2

if [ "${BRANCH}" != "ropsten" && "${BRANCH}" != "rinkeby" && "${BRANCH}" != "mainnet" ]; then
    exit 0
fi

echo -e "\e[32mTesting ${BRANCH} Connection\e[39m"
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}' "${INFURA_API_URL}"
echo -e ""
echo -e "\e[32mTest Result above\e[39m"