// Tax Form Submission
document.querySelector('.tax_form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get input values
  const annualIncome = parseFloat(document.getElementById('annual_income').value);
  const extraIncome = parseFloat(document.getElementById('extra_income').value) || 0;
  const taxableDeductions = parseFloat(document.getElementById('taxable_deductions').value) || 0;
  const age = parseInt(document.getElementById('age').value);
  const taxYear = parseInt(document.getElementById('tax_year').value);

  // Calculate taxable income
  const taxableIncome = annualIncome + extraIncome - taxableDeductions;

  // Determine the applicable tax rebate
  let rebate = 0;
  if (age >= 75) {
    rebate = 3145;  // Tertiary rebate
  } else if (age >= 65) {
    rebate = 9444;  // Secondary rebate
  } else {
    rebate = 17235; // Primary rebate
  }

  // Initialize tax variables
  let taxPayable = 0;

  // Tax calculation based on tax brackets
  if (taxableIncome <= 237100) {
    taxPayable = taxableIncome * 0.18;
  } else if (taxableIncome <= 370500) {
    taxPayable = 42678 + (taxableIncome - 237100) * 0.26;
  } else if (taxableIncome <= 512800) {
    taxPayable = 77362 + (taxableIncome - 370500) * 0.31;
  } else if (taxableIncome <= 673000) {
    taxPayable = 121475 + (taxableIncome - 512800) * 0.36;
  } else if (taxableIncome <= 857900) {
    taxPayable = 179147 + (taxableIncome - 673000) * 0.39;
  } else if (taxableIncome <= 1817000) {
    taxPayable = 251258 + (taxableIncome - 857900) * 0.41;
  } else {
    taxPayable = 644489 + (taxableIncome - 1817000) * 0.45;
  }

  // Apply the rebate
  taxPayable -= rebate;

  // Ensure taxPayable is not negative
  taxPayable = Math.max(taxPayable, 0);

  // Display results in the tax result card
  const taxResultCard = document.getElementById('result_card');
  const resultText = document.getElementById('result_text');
  taxResultCard.style.display = 'block'; // Make the result card visible

  // Set tax result card content
  document.getElementById('tax-result-annual-income').textContent = `R${annualIncome.toFixed(2)}`;
  document.getElementById('tax-result-extra-income').textContent = `R${extraIncome.toFixed(2)}`;
  document.getElementById('tax-result-deductions').textContent = `R${taxableDeductions.toFixed(2)}`;
  document.getElementById('tax-result-age').textContent = age;
  document.getElementById('tax-result-tax-year').textContent = taxYear;
  document.getElementById('tax-result-taxable').textContent = `R${taxPayable.toFixed(2)}`;
});


