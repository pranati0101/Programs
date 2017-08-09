function test()
        {	
            var f = document.getElementById("userInput").value;	
		if(f<=0)
		{
			window.alert("Enter positive integer.");
			return;
		}
		var t=0;
                var h=0;
		for(i=0;i<f;i++)
		{
			var r=Math.random();
			if(r<0.5)
				t++;
			else
				h++;
		}
		var percent=(h/(t+h))*100;
		  
            document.write("Percentage of head vs tail is "+Math.round(percent)+"%.");
        }
