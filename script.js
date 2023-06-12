function checkADB() {
    //GET request to /checkADB
    fetch('http://localhost:3000/checkADB')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.connected) {
            Swal.fire(
                'Good job!',
                'ADB Connected!',
                'success'
            )
            document.getElementById('searchApp').disabled = false;
            document.getElementById('adbBtn').hidden = true;
            document.getElementById('adbBtnC').hidden = false;
            document.getElementById('adbBtnC').disabled = true;
            document.getElementById('searchApp').hidden = false;
        } else {
            Swal.fire(
                'Error!',
                'ADB Connection Failed!',
                'error'
            );
            document.getElementById('searchApp').disabled = true;
        }
    });
}

$('#formApp').submit(function(e) {
    e.preventDefault();
    var appName = $('#androidApp').val();
    if (appName.length === 0) {
        Swal.fire(
            'Error!',
            'Please enter an app name!',
            'error'
        );
        return;
    }
    var url = 'http://localhost:3000/packages/' + appName;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.packages.length > 0) {
            var list = document.getElementById('listApp');
            list.hidden = false;
            list.innerHTML = '';
            for (var i = 0; i < data.packages.length; i++) {
                var item = document.createElement('li');
                item.appendChild(document.createTextNode(data.packages[i].name));
                list.appendChild(item);
            }
        } else {
            Swal.fire(
                'Not Found!',
                'Could not find package!',
                'question'
            )
        }
    })
    .catch(error => {
        Swal.fire(
            'Error!',
            'ADB Connection Failed!',
            'error'
        );
    });
});

