document.getElementById('savings_calculator_form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get input values
  const savingsGoalAmount = parseFloat(document.getElementById('savings_goal_amount').value);
  const initialInvestment = parseFloat(document.getElementById('initial_investment').value);
  const yearsToGrow = parseInt(document.getElementById('years_to_grow').value);
  const interestRate = parseFloat(document.getElementById('interest_rate').value) / 100;

  // Validate inputs
  if (isNaN(savingsGoalAmount) || isNaN(initialInvestment) || isNaN(yearsToGrow) || isNaN(interestRate)) {
      alert('Please enter valid numbers for all fields.');
      return;
  }

  // Calculate the future value of the initial investment with simple interest
  const futureValueOfInitialInvestment = initialInvestment * (1 + interestRate * yearsToGrow);

  // Calculate the remaining amount to be saved
  const remainingAmount = savingsGoalAmount - futureValueOfInitialInvestment;

  // If the remaining amount is negative, no contributions are needed
  if (remainingAmount <= 0) {
      alert("Your initial investment is enough to reach your savings goal without any monthly contributions.");
      return;
  }

  // Calculate the monthly contribution needed to reach the savings goal
  const monthsToGrow = yearsToGrow * 12;
  const totalMonthlyContributions = remainingAmount / monthsToGrow;

  // Display results in the result card
  const resultCard = document.getElementById('result_card');
  resultCard.style.display = 'block';

  const resultText = `
      Your Savings Goal: R${savingsGoalAmount.toFixed(2)}<br>
      Monthly Contribution: R${totalMonthlyContributions.toFixed(2)}<br>
      Duration: ${yearsToGrow} years (${monthsToGrow} months)
  `;
  
  document.getElementById('result_text').innerHTML = resultText;
});









  