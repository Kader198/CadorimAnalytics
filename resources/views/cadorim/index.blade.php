@extends('app')
@section('content')
{{-- this container wrap all of the content of the application  --}}
<div class="container">
    {{-- the jumbotron  --}}
    {{-- End of the jumbotron --}}

    {{-- Start of content --}}
        <div class="box shadow-sm mt-2 bg-white p-4">
            <div class="row">
                <div class="col text-center">
                    <h3 class="display-6 text-info">Analyse des ventes </h3>
                    <p class="text-info text-bold">Des donnees pour vous aider mieux comprendre et a developper votre societe </p>
                </div>
            </div>
            <div class="row justify-content-between p-2">
                <div class="col">
                    <div class="col">
                        <input type="date" class="date form-control-sm border-info" onchange="dateLoadedHandle(event)" />
                    </div>
                </div>
                <div class="col text-right">
                    <a href="" class="btn btn-outline-info">Imprimez <i class="fa fa-print"></i>  <i class=""></i> </a>
                </div>
            </div>
            <nav>
                <div class="nav row-cols-3 nav-tabs" id="nav-tab" role="tablist">
                  <a class="nav-link text-center active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                    <h5>Ventes <i class="fa fa-question-circle "></i></h5>
                    <p>Tout les modes de paiement</p>
                    <p><button class="btn btn-danger ml-3 rounded-pill"><i class="fa fa-sort-down"></i> -68%</button> {{ $sumOfeachAmount }}</p>
                  </a>
                  <a class="nav-link text-center" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" >
                    <h5>transaction <i class="fa fa-question-circle"></i></h5>
                    <p>Tout les modes de paiement</p>
                  <p><button   class="btn btn-danger ml-3 rounded-pill"><i class="fa fa-sort-down"></i> -68%</button>  {{ $numOfOperation }}</p>
                </a>
                  <a class="nav-link text-center" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false" >
                    <h5>Prix de vente de moyen <i class="fa fa-question-circle"></i></h5>
                    <p>Tout les modes de paiement</p>
                  <p><button class="btn btn-danger ml-3 rounded-pill"><i class="fa fa-sort-down"></i> -68%</button> {{ $venteMoyen }}</p>
                  </a>
                </div>
              </nav>
              <div class="tab-content" id="nav-tabContent">
                  {{-- Ventes section --}}
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div class="card">
                        <div class="card-body">
                            <canvas id="canvas" width="400" height="160"></canvas>
                        </div>
                    </div>
                </div>
                  {{--End Ventes section --}}
                {{-- transaction section --}}
                <div class="tab-pane fade " id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div class="card">
                        <div class="card-body">
                            <canvas id="canvas1" width="400" height="160"></canvas>
                        </div>
                    </div>
                </div>
                {{-- End transaction section --}}
                {{-- Prix vente moyen --}}
                <div class="tab-pane fade  " id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <div class="card">
                        <div class="card-body">
                            <canvas id="canvas2" width="400" height="160"></canvas>
                        </div>
                    </div>
                </div>
                {{--End Prix vente moyen --}}
              </div>
        </div>

    {{-- End of the content  --}}
</div>
{{-- End of the container  --}}


@stop

@section('script')
<script>
// !here is the First canvas { Ventes }
var ctx = document.getElementById('canvas');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

//  # here is the second { Transaction }
var ctx1 = document.getElementById('canvas1');
var myChart = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

//  # here is the second { Prix de vente moyen }
var ctx2 = document.getElementById('canvas2');
var myChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

function dateLoadedHandle(e) {
    console.log(e.target.value);
}

</script>

@endsection
