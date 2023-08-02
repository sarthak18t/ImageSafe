// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Drive {
    struct Access{
        address user;
        bool access;
    }

    mapping(address=>string[]) value;
    mapping (address=>mapping (address=>bool)) ownership;
    mapping (address=>Access[]) accessList;
    mapping (address=>mapping (address=>bool)) previousData;

    function add(address _user,string memory _url) public {
        value[_user].push(_url);
    }

    function allow(address _user) public{
        ownership[msg.sender][_user]=true;
        if(previousData[msg.sender][_user]){
            for(uint i=0;i<accessList[msg.sender].length;i++){
                if(accessList[msg.sender][i].user == _user){
                    accessList[msg.sender][i].access=true;
                }
            }
        }
        else{
            accessList[msg.sender].push(Access(_user,true));
            previousData[msg.sender][_user]=true;
        }
    }

    function disAllow(address _user) public{
        ownership[msg.sender][_user]=false;
        for(uint i=0;i<accessList[msg.sender].length;i++){
          if(accessList[msg.sender][i].user==_user){ 
              accessList[msg.sender][i].access=false;  
          }
       }
    }

    function display(address _user) public view returns (string[] memory){
        require(_user == msg.sender || ownership[msg.sender][_user],"You don't have access");
        return value[_user];
    }

    function shareAccess() public view returns (Access[] memory){
        return accessList[msg.sender];
    }
}