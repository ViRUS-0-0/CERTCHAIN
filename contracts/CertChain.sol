// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertChain {
    struct Certificate {
        string studentName;
        string regNo;
        string degree;
        string institution;
        string issueDate;
        address issuedBy;
        uint256 timestamp;
        bool exists;
    }

    mapping(string => Certificate) private certs;
    mapping(address => bool) public authorizedIssuers;
    address public owner;

    event Issued(string certId, address by);

    constructor() {
        owner = msg.sender;
        authorizedIssuers[msg.sender] = true;
    }

    function authorize(address issuer) external {
        require(msg.sender == owner);
        authorizedIssuers[issuer] = true;
    }

    function issue(
        string calldata certId,
        string calldata studentName,
        string calldata regNo,
        string calldata degree,
        string calldata institution,
        string calldata issueDate
    ) external {
        require(authorizedIssuers[msg.sender], "Not authorized");
        require(!certs[certId].exists, "Already exists");
        certs[certId] = Certificate(studentName, regNo, degree, institution, issueDate, msg.sender, block.timestamp, true);
        emit Issued(certId, msg.sender);
    }

    function verify(string calldata certId) external view
        returns (bool exists, string memory studentName, string memory regNo,
                 string memory degree, string memory institution,
                 string memory issueDate, address issuedBy, uint256 timestamp)
    {
        Certificate memory c = certs[certId];
        return (c.exists, c.studentName, c.regNo, c.degree, c.institution, c.issueDate, c.issuedBy, c.timestamp);
    }
}
