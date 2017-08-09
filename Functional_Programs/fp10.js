function test()
{
	var n = document.getElementById("n").value;
	var arr=new Array();var res=[];

	for(i=0;i<n;i++){
		var t=parseInt(prompt("Enter integer value."));
		arr.push(t);}

	var res=new Array();var count=0;
	for(i=0;i<n-2;i++)
	{
		for(j=i+1;j<n-1;j++)
		{
			for(k=j+1;k<n;k++)
			{
				if(((arr[k]+arr[i]+arr[j])==0) && distinct(arr[i],arr[j],arr[k],res)==true)
				{	count ++;
					res.push(arr[i]);
					res.push(arr[j]);
					res.push(arr[k]);
				}
			}
		}
	}

	document.write("Number of distinct triplets is "+count+"<br>");
	for(i=0;i<res.length;i=i+3)
	document.write(res[i]+"\t"+res[i+1]+"\t"+res[i+2]+"<br>");
}
function distinct(n1,n2,n3,res){
	len=res.length;
	if(len==0)
		return true;
	m=len/3; t=0;
	for(i=0;i<m;i++)
	{
		if(n1==res[i] || n1==res[i+1] || n1==res[i+2])
			t++;
		if(n2==res[i] || n2==res[i+1] || n2==res[i+2])
				t++;
		if(n3==res[i] || n3==res[i+1] || n3==res[i+2])
					t++;
	}
	if(t==3)
		return false;
	else {
		return true;
	}
}
