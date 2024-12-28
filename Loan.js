document.querySelector('.loan_calculator_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the page from refreshing
    
    // Get the form values
    const loanAmount = parseFloat(document.getElementById('loan_amount').value);
    const interestRate = parseFloat(document.getElementById('interest_rate').value) / 100;
    const loanTerm = parseInt(document.getElementById('loan_terms').value);
    const extraPayments = parseFloat(document.getElementById('extra_payments').value) || 0;

    // Validate the inputs
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
        alert('Please enter valid values for loan amount, interest rate, and loan term.');
        return;
    }

    // Calculate the monthly interest rate
    const monthlyRate = interestRate / 12;

    // Calculate the standard monthly repayment (without extra payments)
    const monthlyRepayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));

    // Adjust the monthly repayment with extra payments if provided
    const totalMonthlyRepayment = monthlyRepayment + extraPayments;

    // Calculate the total repayment and interest
    const totalRepayment = totalMonthlyRepayment * loanTerm;
    const totalInterest = totalRepayment - loanAmount;

    // Calculate the potential savings from additional payments (if any)
    let savingsFromExtraPayments = 0;
    let adjustedRepaymentTerm = loanTerm;

    if (extraPayments > 0) {
        adjustedRepaymentTerm = Math.ceil(loanAmount / (totalMonthlyRepayment - extraPayments));
        savingsFromExtraPayments = (loanTerm - adjustedRepaymentTerm) * totalMonthlyRepayment;
    }

    // Display results in the desired format with added space
    const resultCard = document.getElementById('result_card');
    const resultText = document.getElementById('result_text');
    
    resultText.innerHTML = `
        <strong>Loan Amount:</strong> R${loanAmount.toFixed(2)}<br><br>
        <strong>Interest Rate:</strong> ${interestRate * 100}%<br><br>
        <strong>Duration:</strong> ${loanTerm} months<br><br>
        <strong>Monthly Repayment:</strong> R${monthlyRepayment.toFixed(2)}<br><br>
        <strong>Total Repayment:</strong> R${totalRepayment.toFixed(2)}<br><br>
        <strong>Interest:</strong> R${totalInterest.toFixed(2)}<br><br>
        <strong>If you make additional payments of R${extraPayments.toFixed(2)} monthly,</strong><br><br>
        <strong>You could save R${savingsFromExtraPayments.toFixed(2)} in interest and shorten your loan term by ${loanTerm - adjustedRepaymentTerm} months.</strong>
    `;

    // Show the result card
    resultCard.style.display = 'block';
});

  






