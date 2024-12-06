let chart = null;

function render() {
    const root = document.getElementById('root');
    
    const content = `
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="card p-4">
                    <div class="card-body">
                        <h3 class="card-title text-center">BMI Calculator</h3>
                        <p class="text-center text-white">Calculate your Body Mass Index (BMI) and check your health status.</p>
                        <form id="bmi-form">
                            <div class="row">
                                <div class="col-md-6 mb-3 text-white">
                                    <label for="feet" class="form-label">Height (Feet)</label>
                                    <input type="number" class="form-control" id="feet" placeholder="Enter feet" required>
                                </div>
                                <div class="col-md-6 mb-3 text-white">
                                    <label for="inches" class="form-label">Height (Inches)</label>
                                    <input type="number" class="form-control" id="inches" placeholder="Enter inches" required>
                                </div>
                            </div>
                            <div class="mb-3 text-white">
                                <label for="weight" class="form-label">Weight (Kilogram)</label>
                                <input type="number" class="form-control" id="weight" placeholder="Enter weight in pounds" required>
                            </div>
                            <button type="button" class="btn btn-primary w-100" onclick="calculateBMI()">Calculate BMI</button>
                        </form>

                        <div id="result" class="text-center d-none">
                            <p class="bmi-result">Your BMI: <span id="bmi-value"></span></p>
                            <p class="bmi-status text-white">Status: <span id="bmi-status"></span></p>
                            <canvas id="bmi-chart" width="200" height="200"></canvas>
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <p class="text-white mb-0">Developed by <a href="https://codewithjosh.vercel.app/" target="_blank" class="text-white">CodewithJosh</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    
    root.innerHTML = content;
}

function calculateBMI() {
    const feet = parseInt(document.getElementById('feet').value) || 0;
    const inches = parseInt(document.getElementById('inches').value) || 0;
    const weight = parseFloat(document.getElementById('weight').value) || 0;

    const totalInches = (feet * 12) + inches;
    if (totalInches === 0 || weight === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter valid values for height and weight.',
        });
        return;
    }

    const heightMeters = totalInches * 0.0254;
    const bmi = (weight / (heightMeters * heightMeters)).toFixed(1);

    let status = '';
    let statusClass = '';
    let chartData = [bmi, 18.5, 24.9, 29.9];
    let chartLabel = ['Your BMI', 'Healthy Upper Limit', 'Overweight Upper Limit', 'Obese Upper Limit'];
    let chartColors = [getStatusColor(bmi), '#22c55e', '#ef4444', '#9b1d20'];

    if (bmi < 18.5) {
        status = 'Underweight';
        statusClass = 'status-underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = 'Healthy';
        statusClass = 'status-healthy';
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = 'Overweight';
        statusClass = 'status-overweight';
    } else {
        status = 'Obese';
        statusClass = 'status-obese';
    }

    document.getElementById('bmi-value').textContent = bmi;
    const statusSpan = document.getElementById('bmi-status');
    statusSpan.textContent = status;
    statusSpan.className = statusClass;

    Swal.fire({
        title: `Your BMI is ${bmi}`,
        text: `Status: ${status}`,
        icon: 'info',
        background: getStatusColor(bmi),
        confirmButtonText: 'Close',
        color: '#fff'
    });

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(document.getElementById('bmi-chart'), {
        type: 'bar',
        data: {
            labels: chartLabel,
            datasets: [{
                label: 'BMI Chart',
                data: chartData,
                backgroundColor: chartColors,
                borderColor: '#292945',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 40,
                }
            }
        }
    });

    document.getElementById('result').classList.remove('d-none');
}

function getStatusColor(bmi) {
    if (bmi < 18.5) {
        return '#fbbf24';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return '#22c55e';
    } else if (bmi >= 25 && bmi <= 29.9) {
        return '#ef4444';
    } else {
        return '#9b1d20';
    }
}

render();
