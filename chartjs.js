function renderbarChart() {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                capitalizeFirstLetter(currentPokemon['stats'][0]['stat']['name']),
                capitalizeFirstLetter(currentPokemon['stats'][1]['stat']['name']),
                capitalizeFirstLetter(currentPokemon['stats'][2]['stat']['name']),
                capitalizeFirstLetter(currentPokemon['stats'][3]['stat']['name']),
                capitalizeFirstLetter(currentPokemon['stats'][4]['stat']['name']),
                capitalizeFirstLetter(currentPokemon['stats'][5]['stat']['name'])
            ],
            datasets: [{
                axis: 'y',
                label: 'Base Stats',
                data: [
                    currentPokemon['stats'][0]['base_stat'],
                    currentPokemon['stats'][1]['base_stat'],
                    currentPokemon['stats'][2]['base_stat'],
                    currentPokemon['stats'][3]['base_stat'],
                    currentPokemon['stats'][4]['base_stat'],
                    currentPokemon['stats'][5]['base_stat']
                ],
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            base: 0,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false,
                    }
                },
                x: {
                    max: 100,
                    grid: {
                        display: false,
                    }
                }
            }
        }
    });
}