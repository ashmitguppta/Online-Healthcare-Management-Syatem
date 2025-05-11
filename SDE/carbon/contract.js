const contractABI = [
    // Add the full ABI of your CarbonCreditSystem contract here
];

const contractAddress = "0xYourContractAddress"; // Replace with deployed contract

async function connectWallet() {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
    } catch (error) {
        console.error("Wallet Connection Failed:", error);
    }
}

// Function to list carbon credits for sale
async function listCredit() {
    const contract = await connectWallet();
    const creditId = document.getElementById("listCreditId").value;
    const price = ethers.utils.parseEther(document.getElementById("listPrice").value);

    try {
        const tx = await contract.listCredit(creditId, price);
        await tx.wait();
        document.getElementById("listStatus").innerText = "Credit Listed for Sale ✅";
    } catch (error) {
        console.error(error);
        document.getElementById("listStatus").innerText = "Listing Failed ❌";
    }
}

// Function to buy carbon credits
async function buyCredit() {
    const contract = await connectWallet();
    const tradeId = document.getElementById("buyTradeId").value;
    const tradePrice = ethers.utils.parseEther(document.getElementById("buyPrice").value);

    try {
        const tx = await contract.buyCredit(tradeId, { value: tradePrice });
        await tx.wait();
        document.getElementById("buyStatus").innerText = "Credits Purchased ✅";
    } catch (error) {
        console.error(error);
        document.getElementById("buyStatus").innerText = "Purchase Failed ❌";
    }
}

// Function to retire (burn) credits
async function retireCredit() {
    const contract = await connectWallet();
    const creditId = document.getElementById("retireCreditId").value;
    const amount = document.getElementById("retireAmount").value;

    try {
        const tx = await contract.retireCredit(creditId, amount);
        await tx.wait();
        document.getElementById("retireStatus").innerText = "Credits Retired ✅";
    } catch (error) {
        console.error(error);
        document.getElementById("retireStatus").innerText = "Retirement Failed ❌";
    }
}

// Expose functions globally
window.connectWallet = connectWallet;
window.listCredit = listCredit;
window.buyCredit = buyCredit;
window.retireCredit = retireCredit;
