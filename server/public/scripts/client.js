$(handleReady);

function handleReady() {
    console.log('jquery loaded!');

    //click listeners
    $('#equals').on('click',addProblem);
    $('#add').on('click',addAddition);
    $('#subtract').on('click',addSubtract);
    $('#divide').on('click',addDivision);
    $('#multiply').on('click',addMultiplication);

    

    //get equations
    getEquations();
}

let modifier = '';

// modifier value that changes if modifier button is clicked

function addAddition() {
    modifier = '+';
    console.log('this is the modifier', modifier);
}

function addSubtract() {
    modifier = '-';
    console.log(modifier);
}

function addDivision() {
    modifier = '/';
    console.log(modifier);
}

function addMultiplication() {
    modifier = '*';
    console.log(modifier);
}

function addProblem() {
    let newProblem = {
        num1: $('#num1').val(),
        num2: $('#num2').val(),
        modifier: modifier
    }

    console.log(newProblem
        )
    $.ajax({
        method: 'POST',
        url: '/equations',
        data: newProblem
    }).then(response => {
        console.log(response);
        getEquations();
    });
    $('#num1').val('');
    $('#num2').val('');
    modifier = '';

}

function getEquations() {
    $.ajax({
        method: 'GET',
        url: '/equations'
    }).then(function (response){
        console.log(response)
        //empty DOM
        $('#equationDataList').empty();

        for(let equation of response) {
            $('#equationDataList').append(`
            <li>${equation.num1} ${equation.modifier} ${equation.num2} = ${equation.solution}</li>
            `)
        }
    })
}