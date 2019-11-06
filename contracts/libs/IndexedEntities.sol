pragma solidity >=0.5.0;

import "../libs/ownership/Ownable.sol";


/// @title IndexedEntities
contract IndexedEntities is Ownable {

    /**
     * _owner ---> _type1 -> registry -------> 0    ---> _item0
     *         |      |                    |-> 1    ---> _item1
     *         |      |                    |   ...
     *         |      |                    \-> M1   ---> _itemM1
     *         |      |
     *         |      |----> availability ---> 0x1  ---> true/false
     *         |      |                    |-> 0x2  ---> true/false
     *         |      |                    |   ...
     *         |      |                    \-> 0xM1 ---> true/false
     *         |      |
     *         |      \----> count ----------> 0,1,2,...,M1
     *         |
     *         |-> _type2 -> registry -------> 0    ---> _item0
     *         |      |                    |-> 1    ---> _item1
     *         |      |                    |   ...
     *         |      |                    \-> M2   ---> _itemM2
     *         |      |
     *         |      |----> availability ---> 0x1  ---> true/false
     *         |      |                    |-> 0x2  ---> true/false
     *         |      |                    |   ...
     *         |      |                    \-> 0xM2 ---> true/false
     *         |      |
     *         |      \----> count ----------> 0,1,2,...,M2 
     *         |
     *         |    . . .
     *         |
     *         \-> _typeN -> registry -------> 0    ---> _item0
     *                |                    |-> 1    ---> _item1
     *                |                    |   ...
     *                |                    \-> MN   ---> _itemMN
     *                |
     *                |----> availability ---> 0x1  ---> true/false
     *                |                    |-> 0x2  ---> true/false
     *                |                    |   ...
     *                |                    \-> 0xMN ---> true/false
     *                |
     *                \----> count ----------> 0,1,2,...,MN          */
    struct Item {
        mapping(uint256 => address) registry;
        mapping(address => bool) availability;
        uint256 count;
    }
    mapping(address => mapping(string => Item)) private items;

    event ItemAdded(address indexed _owner, string _type, address _item, uint256 _index);

    /// @notice Adds a new item to the map
    /// @param _owner The wallet the item is going to be assigned to
    /// @param _type The type of the item
    /// @param _item The item
    function addItem(
        address _owner, 
        string memory _type, 
        address _item) 
        public
        onlyImmediateOwnerOrWhitelisted 
        {
        require(items[_owner][_type].availability[_item] == false, "The item has already been Added");
        items[_owner][_type].registry[items[_owner][_type].count] = _item;
        emit ItemAdded(_owner, _type, _item, items[_owner][_type].count);
        items[_owner][_type].availability[_item] = true;
        items[_owner][_type].count = items[_owner][_type].count + 1;
    }

    /// @notice Gets an item from the map
    /// @param _owner The wallet to get the item from
    /// @param _type The type of the item
    /// @param _index The index where the item is stored
    function getItem(
        address _owner, 
        string memory _type, 
        uint256 _index) 
        public  
        view 
        onlyImmediateOwnerOrWhitelisted
        returns(address) 
        {
        require(_index < items[_owner][_type].count, "Index out of bounds");
        return items[_owner][_type].registry[_index];
    }

    /// @notice Gets the item count for the wallet
    /// @param _owner The wallet to get the count from
    /// @param _type The type of the item
    function getCount(address _owner, string memory _type) 
            public 
            view 
            onlyImmediateOwnerOrWhitelisted
            returns(uint256) 
            {
        return items[_owner][_type].count;
    }

    /// @notice Returns TRUE if the _item is associated to _source, FALSE otherwise
    /// @param _owner The wallet to get the item from
    /// @param _type The type of the item
    /// @param _item The item being validated
    function hasItem(address _owner, string memory _type, address _item) 
            public 
            view 
            onlyImmediateOwnerOrWhitelisted
            returns(bool) 
            {
        return items[_owner][_type].availability[_item];
    }
}
