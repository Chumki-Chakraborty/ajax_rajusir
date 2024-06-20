$(document).ready(function(){
    $('.delete-student').on('click',function(e){
        $target = $(e.target);
         //console.log($target.attr('data-id'));
        const id = $target.attr('data-id');
        const conf = confirm("Are You Sure Boss?");
        if(conf){
            $.ajax({
                type: "GET",
                url: "/delete/"+id,
                success: function(res){
                    alert("Data Deleted!!!");
                    window.location.href = "/";
                },
                error: function(err){
                    console.log(err);
                }
            });
        }else{
            alert("Okay... Data Is Safe Now...")
        }
    });

    $('.courses').on('change',function(e){
        // alert("Hi");
        // console.log($('.courses option:selected').text());
        const data = $('.courses option:selected').text();
        if(data == "Laravel"){
            $('.fees').val(10000);
        }else if(data == "Node JS"){
            $('.fees').val(15000);
        }else if(data == "Web Designing"){
            $('.fees').val(8500);
        }
    });

    $('.edit-student').on('click',function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        const conf = confirm("Are You Sure To Update?");
        if(conf){
            $.ajax({
                type: "POST",
                url: "/update/update-student/"+id,
                success: function(res){
                    alert("Data Updated!!!");
                    window.location.href = "/";
                },
                error: function(err){
                    console.log(err);
                }
            });
        }else{
            alert("Okay... Data Is Not Updated...");
            window.location.href = "/";
        }
    });
});