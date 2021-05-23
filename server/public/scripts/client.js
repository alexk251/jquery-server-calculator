$(handleReady);

function handleReady() {
    console.log('jquery loaded!');

    //click listeners
    $('#equals').on('click',addProblem);
    $('#add').on('click',addAddition);
    $('#subtract').on('click',addSubtract);
    $('#divide').on('click',addDivision);
    $('#multiply').on('click',addMultiplication);
    $('#clear').on('click',clear);

    $('#equationDataList li:nth-child(odd)').addClass('alternate');
    

    //get equations
    getEquations();
}

let modifier = '';

function clear() {
    $('#num1').val('');
    $('#num2').val('');
    modifier = '';
};

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

}

function getEquations() {
    $.ajax({
        method: 'GET',
        url: '/equations'
    }).then(function (response){
        console.log(response)
        //empty DOM
        $('#equationDataList').empty();
        if (response[response.length-1].solution === undefined){
            $('#solution').text(`0`);
        } else {
            $('#solution').text(response[response.length-1].solution);
            console.log(response[response.length-1].solution);
        }
        
        for(let equation of response) {
            $('#equationDataList').append(`
            <li>${equation.num1} ${equation.modifier} ${equation.num2} = ${equation.solution}</li>
            `)
            $('#equationDataList li:nth-child(odd)').addClass('alternate');
        }
    })
    

}