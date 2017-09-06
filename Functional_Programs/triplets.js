//print distinct triplets
function test()
{
	var length = document.getElementById("n").value;
	var array=new Array();
	var result=new Array();
	var count=0;

	for(i=0;i<length;i++){
		var data=parseInt(prompt("Enter integer value."));
		array.push(data);
	}

	for(i=0;i<length-2;i++)
	{
		for(j=i+1;j<length-1;j++)
		{
			for(k=j+1;k<length;k++)
			{
				if(((array[k]+array[i]+array[j])===0) && distinct(array[i],array[j],array[k],result)==true)
				{
					count ++;
					result.push(array[i]);
					result.push(array[j]);
					result.push(array[k]);
				}
			}
		}
	}
//printing triplets
	document.write("Number of distinct triplets is "+count+"<br>");
	for(i=0;i<result.length;i=i+3){
		document.write(result[i]+"\t"+result[i+1]+"\t"+result[i+2]+"<br>");
	}
	document.write("<br>Original array of numbers entered: "+array);
}
//chk if triplets are already present
function distinct(num1,num2,num3,result){
	len=result.length;
	var row=len/3, flag=0;

	if(len==0)
	{
		return true;
	}

	for(i=0;i<row;i++)
	{
		if(num1==result[i] || num1==result[i+1] || num1==result[i+2])
			flag++;
		if(num2==result[i] || num2==result[i+1] || num2==result[i+2])
			flag++;
		if(num3==result[i] || num3==result[i+1] || num3==result[i+2])
			flag++;
	}
	if(flag==3)
		return false;
	else {
		return true;
	}
}
