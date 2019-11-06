#!/bin/bash

contracts=../contracts
homedir=.

solc --overwrite ${contracts}/platform/kyc/IKycProcessTracker.sol --bin --abi --optimize -o ${homedir}/solc-output/ --allow-paths ${contracts}/libs/ownership,${contracts}/libs,${contracts}/governance,${contracts}/platform,${contracts}/platform/kyc,${contracts}/whitelist
web3j solidity generate --javaTypes -b ${homedir}/solc-output/IKycProcessTracker.bin -a ${homedir}/solc-output/IKycProcessTracker.abi -o ${homedir}/java-output -p com.bitcar.api.contract
