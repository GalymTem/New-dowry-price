document.getElementById('calculate').addEventListener('click', () => {
    let name = document.getElementById('name').value;
    let price = Number(document.getElementById('startingBid').value);

    if (!name || !price) {
        alert('Please enter a valid name and starting bid.');
        return;
    }

    const education = Number(document.getElementById('education').value);
    price *= education;

    const netWorth = Number(document.getElementById('netWorth').value);
    price *= netWorth;

    const caste = Number(document.getElementById('caste').value);
    price += caste;

    const skills = Array.from(document.getElementsByClassName('skills'));
    const skillsTotal = skills
        .filter(skill => skill.checked)
        .reduce((total, skill) => total + Number(skill.value), 0);
    price += skillsTotal;

    document.querySelectorAll('input[name="age"]').forEach(age => {
        if (age.checked) {
            price *= Number(age.value);
        }
    });

    const reputation = document.getElementsByClassName('reputation');
    for (let i = 0; i < reputation.length; i++) {
        const value = Number(reputation[i].value);
        if (reputation[i].checked) {
            price *= (value < 0 ? 1 : value);
            if (value < 0) price += value;  // Deduct fixed amount if negative
        }
    }


    const loveLetter = document.getElementById('loveLetter').value;

    // Create object with details
    let person = {
        bride_or_groom_name: name,
        dowry_price: price,
        love_message: loveLetter
    };

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Your price for ${person.bride_or_groom_name} is $${person.dowry_price.toFixed(2)}.</p>
        <p>Your Love Letter: ${person.love_message}</p>
    `;
    resultDiv.style.color = person.dowry_price < 0 ? 'red' : 'green';
});
