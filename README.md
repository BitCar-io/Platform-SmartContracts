# BitCar Ethereum SmartContracts

### Setup 
```
git clone http://192.168.1.100/BitCar/Platform/Backend.git
cd Backend
yarn install
```

### Test
```
ganache-cli
yarn test
```

### Code Auditing
```
solium -d contracts/
```

### Build documentation
```
yarn run docgen
```
*Ignore any errors that may be produced*