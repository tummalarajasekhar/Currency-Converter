base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
let dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");

for( select of dropdowns){
	for(currCode in countryList){
		let newOption=document.createElement("option");
		newOption.innerText=currCode;
		newOption.value=currCode;
		
		if(select.name==="from" && currCode==="USD")
		{
			newOption.selected="selected";
		}else if(select.name==="to" && currCode==="INR")
		{
			newOption.selected="selected";
		}
		select.append(newOption);
		
	}
	select.addEventListener("change",(evt)=>{
			updateFlag(evt.target);
		});
}
const updateFlag=(evt)=>{
	currValue=evt.value;
	countryCode=(countryList[currValue]);
	newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`
	evt.parentElement.querySelector("img").src=newsrc;
	
}
btn.addEventListener("click",async (evt)=>{
	evt.preventDefault();
	let amount=document.querySelector(".amount input");
	let amtVal=amount.value;
	if(amtVal==="" || amtVal<1)
	{
		amount.value=1;
		amtVal=1;
	}
	
		
	const FC=fromCurr.value.toLowerCase();
	const TC=toCurr.value.toLowerCase();
	console.log(FC,TC);
	let URL=`${base_URL}${FC}.json`;
	let response =await fetch(URL);
	
	let data=await response.json();
	
	const ConversionRate=data[FC][TC];
	let finalAmt=ConversionRate*amtVal;
document.querySelector(".msg").innerText=`${amtVal}${fromCurr.value} = ${finalAmt}${toCurr.value}`;
document.querySelector(".CR").innerText=`Conversion Rate : ${ConversionRate}`;
	console.log(finalAmt);
	
	
});
