    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        {{-- <link rel="stylesheet" href="/bootstrap/dist/css/bootstrap.css"> --}}
        <link rel="stylesheet" href="{{ asset("/css/Chart.css") }}"/>
        <link rel="stylesheet" href="{{ asset("/css/app.css") }}"/>
        <style>
            .load{
                margin-top: 40px;
                margin-left: 495px !important;
            }

            *{
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                outline: none;
            }


            .tabO{
                background-color: white !important;
                transition: all .4s ease-in-out !important;
                /* box-shadow: outset 0 0 8px #888585; */
                transform: translateY(-2px);
                box-shadow: 0 2px 3px .3px rgb(105, 153, 241);
            }

            .tabO > h5{
                text-transform: uppercase;
            }
            .txt{
                font-size: 1rem;
                font-weight: bold !important;
            }

            h5{
                font-weight: bold;
                transition: all .3s ease-in-out !important;
            }
            /* .DateRangePickerInput {
                background-color: #fff;
                display: inline-block;
                margin-left: 350px !important;
                margin-bottom: 14px !important;
            } */
            #your_unique_end_date_id{
                font-weight: 500 !important;
            }
            #your_unique_start_date_id{
                font-weight: 500 !important;
            }
            .nav-link{
                transition: all .1s ease-in-out !important;
            }
            .DateRangePickerInput__withBorder {
                border-radius: 2px;
                box-shadow: 0 2px 3px .3px rgb(105, 153, 241);
                border: 1px solid !important;
            }


        </style>
        <?
            setlocale(LC_TIME,'fr_FR');
            date_default_timezone_set('Europe/Paris');
         ?>
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <title>Cadorim analytics :)</title>
    </head>
    <body class="bg-info">
        {{-- All the content  --}}
            {{-- @yield('content') --}}
        {{-- End of All the content --}}

        <div id="app"></div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
        <script src="/js/Chart.js"></script>
        <script src="/js/app.js"></script>

        {{-- The script of other part --}}
            {{-- @yield('script') --}}
        {{-- End of the script --}}
    </body>
    </html>
