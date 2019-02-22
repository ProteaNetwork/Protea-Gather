pragma solidity >=0.5.3 < 0.6.0;

import { EventManagerV1 } from "./EventManagerV1.sol";
import { BaseFactory } from "../../../shared/interfaces/BaseFactory.sol";
import { IEventManagerFactory } from "../IEventManagerFactory.sol";

contract EventManagerV1Factory is BaseFactory, IEventManagerFactory {
    function deployEventManager(address _tokenManager, address _membershipManager) external onlyRootFactory() returns (address) {
        return address( 
            new EventManagerV1(
                _tokenManager,
                _membershipManager
        ));
    }
}