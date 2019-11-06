pragma solidity >=0.5.0;


/// @title ECVerify
contract ECVerify {

    /// @notice Obtains the original address that created the signature
    /// @param _docHash Hash of the message
    /// @param _v Element part of the digital signature
    /// @param _r Element part of the digital signature
    /// @param _s Element part of the digital signature
    function getAddrFromSignature(
        bytes32 _docHash, 
        uint8 _v, 
        bytes32 _r, 
        bytes32 _s) 
            public 
            pure
            returns (address) 
            {
        return ecrecover(
            _docHash, 
            _v, 
            _r, 
            _s);
    }

    /// @notice Obtains the original address that created the signature
    /// @param _docHash Hash of the message
    /// @param _v Element part of the digital signature
    /// @param _r Element part of the digital signature
    /// @param _s Element part of the digital signature
    function getAddrFromSignatureWithPrefix(
        bytes32 _docHash, 
        uint8 _v, 
        bytes32 _r, 
        bytes32 _s) 
            public 
            pure
            returns (address) 
            {
        bytes memory pfx = "\x19Ethereum Signed Message:\n32";
        bytes32 _ph = keccak256(abi.encodePacked(pfx, _docHash));
        return ecrecover(
            _ph, 
            _v, 
            _r, 
            _s);
    }

    /// @notice Obtains and validates the original address that created the signature
    /// @param _addr The address to compare with the one obtained from the signature
    /// @param _docHash Hash of the message
    /// @param _v Element part of the digital signature
    /// @param _r Element part of the digital signature
    /// @param _s Element part of the digital signature
    function validateSignature(
        address _addr, 
        bytes32 _docHash, 
        uint8 _v, 
        bytes32 _r, 
        bytes32 _s) 
            public 
            pure 
            returns (bool) 
            {

        // Prefix might be necessary
        // https://github.com/ethereum/go-ethereum/issues/3731
        //
        // bytes memory pfx = "\x19Ethereum Signed Message:\n32";
        // h = sha3(pfx, h);

        bool result = (getAddrFromSignature(
            _docHash, 
            _v, 
            _r, 
            _s) == _addr);
        if (result == false) {  // If addresses do not match, try with the Prefix
            result = (getAddrFromSignatureWithPrefix(
                _docHash, 
                _v, 
                _r, 
                _s) == _addr);
        }
        return result;
    }
}
