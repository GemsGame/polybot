// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {IUniswapV2Router02} from "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import {IERC20} from "./IERC20.sol";

contract BotV1 {
    /*
    
    Simple trading with Uniswap V2 protocol
    
     */
    address owner;
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    event TradingEvent(
        address router0,
        address router1,
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint amountOutMin,
        uint deadline
    );

    function tradeV2(
        address router0,
        address router1,
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint amountOutMin,
        uint deadline
    ) external onlyOwner {
        uint init_tokenIn = IERC20(tokenIn).balanceOf(address(this));
        uint init_tokenOut = IERC20(tokenOut).balanceOf(address(this));

        swapExactTokensForTokens(
            router0,
            tokenIn, 
            tokenOut,
            amountIn, 
            amountOutMin,
            block.timestamp + deadline
        );

        uint new_tokenOut = IERC20(tokenOut).balanceOf(address(this));
        uint tradeableAmount = new_tokenOut - init_tokenOut;

        swapExactTokensForTokens(
            router1,
            tokenOut,
            tokenIn,
            tradeableAmount,
            amountOutMin,
            block.timestamp + deadline
        );

        uint end_tokenIn = IERC20(tokenIn).balanceOf(address(this));
        require(end_tokenIn > init_tokenIn, "Trade Reverted, No Profit Made");
        emit TradingEvent(router0, router1, tokenIn, tokenOut, amountIn, amountOutMin, block.timestamp + deadline);
    }

    function swapExactTokensForTokens(address router, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOutMin, uint deadline) private {
        IERC20(tokenIn).approve(router, amountIn);
        address[] memory path;
        path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;
        IUniswapV2Router02(router).swapExactTokensForTokens(amountIn, amountOutMin, path, address(this), deadline);
    }

    function recoverTokens(address tokenAddress) external onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    function recoverEth() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function getBalance(
        address _tokenContractAddress
    ) external view returns (uint256) {
        return IERC20(_tokenContractAddress).balanceOf(address(this));
    }

    receive() external payable {}
}
