// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Docial {
    struct Image{
        uint256 id;
        string image;
        uint256 timestamp;
        address author;
    }

    uint256 count;

    Image[] public images;

    event ImageUploaded(
        uint256 id,
        string hash,
        uint256 timestamp,
        address author

    );

    function getImages() view public returns(
        Image[] memory

    ){
        return images;

    }

    function postImage(string memory image) public {
        require(bytes(image).length > 0);
        address poster = msg.sender;
        count++;
        images.push(Image(count, image, block.timestamp, poster));
        emit ImageUploaded(count, image, block.timestamp, poster);

    }

    
} 
