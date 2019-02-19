pragma solidity >=0.5.3 < 0.6.0;

import "../../_resources/openzeppelin-solidity/token/ERC20/IERC20.sol";
import "../../_resources/openzeppelin-solidity/math/SafeMath.sol";
import "../../_resources/openzeppelin-solidity/access/Roles.sol";
import "../../tokenManager/ITokenManager.sol";

// Use Library for Roles: https://openzeppelin.org/api/docs/learn-about-access-control.html

/// @author Ryan @ Protea 
/// @title V1 Membership Manager
contract MembershipManagerV1 {
    using SafeMath for uint256;
    using Roles for Roles.Role;

    address internal tokenManager_;
    uint8 internal membershipTypeTotal_;

    Roles.Role internal admins_;
    Roles.Role internal systemAdmins_;

    mapping(address => RegisteredUtility) internal registeredUtility_;
    mapping(address => mapping (uint8 => uint256)) internal reputationRewards_;

    mapping(address => Membership) internal membershipState_;
   
    struct RegisteredUtility{
        bool active;
        mapping(uint256 => uint256) lockedStakePool; // Total Stake withheld by the utility
        mapping(uint256 => mapping(address => uint256)) contributions; // Traking individual token values sent in
    }

    struct Membership{
        uint256 currentDate;
        uint256 tokensStaked;
        uint256 reputation;
        uint8 activeCommitment;
    }

    event UtilityAdded(address issuer);
    event UtilityRemoved(address issuer);
    event ReputationRewardSet(address indexed issuer, uint8 id, uint256 amount);

    event StakeLocked(address indexed member, address indexed utility, uint256 tokenAmount);
    event StakeUnlocked(address indexed member, address indexed utility, uint256 tokenAmount);

    event MembershipStaked(address indexed member, uint256 tokensStaked);
   
    constructor(address _communityManager) public {
        admins_.add(_communityManager);
        systemAdmins_.add(_communityManager);
        systemAdmins_.add(msg.sender); // This allows the deployer to set the membership manager
    }

    modifier onlyAdmin() {
        require(admins_.has(msg.sender), "User not authorised");
        _;
    }

    modifier onlySystemAdmin() {
        require(systemAdmins_.has(msg.sender), "User not authorised");
        _;
    }

    modifier onlyUtility(address _utilityAddress){
        require(registeredUtility_[_utilityAddress].active, "Address is not a registered utility");
        _;
    }

    function initialize(address _tokenManager) external onlySystemAdmin returns(bool) {
        require(tokenManager_ == address(0), "Contracts initalised");
        tokenManager_ = _tokenManager;
        systemAdmins_.remove(msg.sender);
    }

    function addUtility(address _utility, uint8 _usageCost) external onlyAdmin{
        registeredUtility_[_utility].active = true;
    }

    function removeUtility(address _utility) external onlyAdmin{
        registeredUtility_[_utility].active = false;
    }

    function setReputationRewardEvent(address _utility, uint8 _id, uint256 _rewardAmount) external onlyAdmin onlyUtility(_utility){
        reputationRewards_[_utility][_id] = _rewardAmount;
    }

  
    function registerMembership(uint256 _colateral, address _member) external  {
        membershipState_[_member].currentDate = now;
        membershipState_[_member].tokensStaked = _colateral;
    }


    function lockCommitment(address _member, uint256 _index, uint256 _daiValue) external returns (bool) /* onlyUtility(msg.sender)*/  {
        // Calculates the amount of the membership tokens are being staked with the contribution
        // TODO: calculate contribution value 
        
        // uint256 contribution = membershipState_[_member].tokensStaked.div(
        //     registeredUtility_[msg.sender].usageCost
        // );

        // membershipState_[_member].activeCommitment = membershipState_[_member].activeCommitment + registeredUtility_[msg.sender].usageCost;
        // registeredUtility_[msg.sender].contributions[_index][_member] = contribution;
        // registeredUtility_[msg.sender].stakedPool[_index] = registeredUtility_[msg.sender].stakedPool[_index].add(contribution);

        return true;
    }

    function unlockCommitment(address _member, uint256 _index) external returns (bool) /* onlyUtility(msg.sender)*/  {
        // TODO: check the commitment locked by the utility

        // membershipState_[_member].activeCommitment = membershipState_[_member].activeCommitment - registeredUtility_[msg.sender].usageCost;
        return true;
    }

    function reputationOf(address _account) public view returns(uint256) {
        return (membershipState_[_account].reputation);
    }

    function getMembershipStatus(address _member) 
        public 
        view 
        returns(uint256, uint256, uint8)
    {
        return (
            membershipState_[_member].currentDate,
            membershipState_[_member].reputation,
            membershipState_[_member].activeCommitment
        );
    }

    function tokenManager() external view returns(address) {
        return tokenManager_;
    }

}