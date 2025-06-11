document.addEventListener("DOMContentLoaded",function(){

    const searchButton = document.getElementById("search-btn");
    const userNameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgress = document.querySelector(".easy-progress");
    const mediumProgress = document.querySelector(".med-progress");
    const hardProgress = document.querySelector(".hard-progress");
    const easyLabel  = document.getElementById("easy-label");
    const mediumLabel  = document.getElementById("med-label");
    const hardLabel  = document.getElementById("hard-label");
    const statsCard = document.querySelector(".stats-card");

    function validateUsername(username){
        if(username==="")
        {
            alert("Kindly Enter a Username");
            return false;
        }
        const regex =  /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
        const isMatching = regex.test(username);
        if(!isMatching)
        {
            alert("Invalid Username ");
        }
        return isMatching;
    }
    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchButton.textContent="Searching...";
            searchButton.disabled=true;
            const response = await fetch(url);
            if(!response.ok)
            {
                throw new error("Unable to fetch");
            }
            const data = await response.json();
            console.log(data);
            const easyCalc = (data.easySolved/data.totalEasy)*100*3.6;
            const medCalc = (data.mediumSolved/data.totalMedium)*100*3.6;
            const hardCalc = (data.hardSolved/data.totalHard)*100*3.6;
            console.log(`Easy:${easyCalc} Med:${medCalc} Hard:${hardCalc}`);

            easyProgress.style.setProperty("--progress-degree",`${easyCalc}deg`);
            mediumProgress.style.setProperty("--progress-degree",`${medCalc}deg`);
            hardProgress.style.setProperty("--progress-degree",`${hardCalc}deg`);

            easyLabel.textContent = `${data.easySolved}/${data.totalEasy}`;
            mediumLabel.textContent = `${data.mediumSolved}/${data.totalMedium}`;
            hardLabel.textContent = `${data.hardSolved}/${data.totalHard}`;
           
            statsCard.innerHTML = ` 
            <h3>Ranking : ${data.ranking}<h3>
            <h3>Acceptance Rate : ${data.acceptanceRate}<h3>
            <h3>Contribution Points : ${data.contributionPoints}<h3>
            <h3>Total Solved : ${data.totalSolved}<h3>
            `
            
        }
        catch(error){
            statsCard.innerHTML=`<p>NO DATA FOUND</p>`
        }
        finally{
            searchButton.textContent="Search";
            searchButton.disabled=false;
        }

    }
    searchButton.addEventListener("click",function(){

        const username = userNameInput.value;
        if(validateUsername(username))
        {
            fetchUserDetails(username);
        }
        
        


    })





})