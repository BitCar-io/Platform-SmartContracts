pragma solidity >=0.5.0;

import "../platform/Registry.sol";
import "./AccessControl.sol";


/// @title Groups
/// @notice Contract that implements the modifiers that check 
/// permissions among all the users groups available
/// @dev If a new role needs to be implemented, a new reference
/// must be added as a contract attribute
contract Groups { 
    AccessControl internal sudoAccCtrl;
    AccessControl internal adminAccCtrl;
    AccessControl internal agentAccCtrl;
    AccessControl internal traderAccCtrl;
    AccessControl internal assetAccCtrl;

    /// @param _config References to AccessControl contracts 
    constructor(address _config) public {
        require(_config != address(0), "_config address cannot be 0");
        sudoAccCtrl = AccessControl(address(uint160(Registry(_config).getAddress("Sudo"))));
        adminAccCtrl = AccessControl(address(uint160(Registry(_config).getAddress("Admin"))));
        agentAccCtrl = AccessControl(address(uint160(Registry(_config).getAddress("Agent"))));
        traderAccCtrl = AccessControl(address(uint160(Registry(_config).getAddress("Trader"))));
        assetAccCtrl = AccessControl(address(uint160(Registry(_config).getAddress("AssetRole"))));
    }

    /// @notice Throws if msg.sender is not from the Sudo Group
    modifier onlyOwner() {require(isOwner(msg.sender), "Address is not Owner."); _;}
    /// @notice Throws if msg.sender is not from the Group
    modifier onlySudo() {require(isSudo(msg.sender), "Address is not Sudo."); _;}
    /// @notice Throws if msg.sender is not from the Sudo Group or The Owner
    modifier onlySudoOrOwner() {require(isOwner(msg.sender) || isSudo(msg.sender), "Only a Sudo or Owner can execute this function."); _;}
    /// @notice Throws if msg.sender is not from the Group
    modifier onlyAdmins() {require(isAdmin(msg.sender) && isVerifiedAdmin(msg.sender), "Address is not a verified Admin."); _;}
    /// @notice Throws if msg.sender is not from the Group
    modifier onlyAgents() {require(isAgent(msg.sender) && isVerifiedAgent(msg.sender), "Address is not a verified Agent."); _;}
    /// @notice Throws if msg.sender is not from the Group
    modifier onlyTraders() {require(isTrader(msg.sender), "Address is not a Trader."); _;}
    /// @notice Throws if msg.sender is not from the Group
    modifier onlyVerifiedTraders() {require(isTrader(msg.sender) && isVerifiedTrader(msg.sender), "Trader is no Verified."); _;}
    /// @notice Throws if msg.sender is not from the Group
    modifier onlyAssets() {require(isAsset(msg.sender), "Address is not an Asset."); _;}
    /// @notice Throws if msg.sender is not from the Group
    modifier onlyVerifiedAssets() {require(isAsset(msg.sender) && isVerifiedAsset(msg.sender), "Asset addr is not Verified."); _;}

    /// @notice Returns TRUE if _addr is The Owner, FALSE otherwise.
    function isOwner(address _addr) public view returns (bool) {return _addr == sudoAccCtrl.getOwnerAddress();}
    /// @notice Returns TRUE if _addr belongs to SUDO Group, FALSE otherwise.
    function isSudo(address _addr) public view returns (bool) {return sudoAccCtrl.isRole(_addr);}
    /// @notice Returns TRUE if _addr belongs to ADMIN Group, FALSE otherwise.
    function isAdmin(address _addr) public view returns (bool) {return adminAccCtrl.isRole(_addr);}
    /// @notice Returns TRUE if _addr is verified, FALSE otherwise.
    function isVerifiedAdmin(address _addr) public view returns (bool) {return adminAccCtrl.isVerifiedUser(_addr);}
    /// @notice Returns TRUE if _addr belongs to AGENTS Group, FALSE otherwise.
    function isAgent(address _addr) public view returns (bool) {return agentAccCtrl.isRole(_addr);}
    /// @notice Returns TRUE if _addr is verified, FALSE otherwise.
    function isVerifiedAgent(address _addr) public view returns (bool) {return agentAccCtrl.isVerifiedUser(_addr);}
    /// @notice Returns TRUE if _addr belongs to TRADERS Group, FALSE otherwise.
    function isTrader(address _addr) public view returns (bool) {return traderAccCtrl.isRole(_addr);}
    /// @notice Returns TRUE if _addr is verified, FALSE otherwise.
    function isVerifiedTrader(address _addr) public view returns (bool) {return traderAccCtrl.isVerifiedUser(_addr);}
    /// @notice Returns TRUE if _addr belongs to ASSETs Group, FALSE otherwise.
    function isAsset(address _addr) public view returns (bool) {return assetAccCtrl.isRole(_addr);}
    /// @notice Returns TRUE if _addr is verified, FALSE otherwise.
    function isVerifiedAsset(address _addr) public view returns (bool) {return assetAccCtrl.isVerifiedUser(_addr);}
}
