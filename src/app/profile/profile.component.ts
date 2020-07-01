import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private obj:HttpClient) { }
  tokenno:string;
  
  ngOnInit(): void {
	  this.tokenno = sessionStorage.getItem("tokenno");
	  this.getcompany("Active");
  }
  
  blockName:string="new";
  companyid:string="";
  enableBlock(input:string)
  {
	  this.blockName = input;
	  
	  if(this.blockName !='new'){
		  this.getprofile(this.companyid, this.blockName); // on click of any status button respection records will load
	  }
  }
  
      allcompany:any[]=[];
	  getcompany(status:string="Active")
	  {
		  this.allcompany=[];// setting to empty
		  var url = "https://www.firstenquiry.com/api/angular/companylist.php";
		  var input = {
						"hrid":this.tokenno,
						"status":status
					  };
		this.obj.post(url, input).subscribe(response=>{
			this.allcompany = response as string[];
		})
	  }
	  
  joblist:any[]=[];
  getjob(clientid:number)
  {
		  this.joblist=[];// setting to empty
		  var url = "https://www.firstenquiry.com/api/angular/joblist.php";
		  var input = {
						"hrid":this.tokenno,
						"status":"Active",
						"clientid":clientid
					  };
		this.obj.post(url, input).subscribe(response=>{
			this.joblist = response as string[];
		})
  }

  fname:string;
  lname:string;
  email:string;
  mobile:string;
  exp:string;
  ctc:string 
  type:string;
  ectc:string;
  msg:string;
  serverResponse;
  
  save(clientid:number, jobid:number)
  {
	   var url = "https://www.firstenquiry.com/api/angular/saveprofile.php";
	  var input = {
					"fname":this.fname,
					"lname":this.lname,
					"email":this.email,
					"mobile":this.mobile,
					"type":this.type,
					"ctc":this.ctc,					
					"ectc":this.ectc,
					"exp":this.exp,
					"clientid":clientid,
					"jobid":jobid,
					"hrid":this.tokenno
				  };
	this.obj.post(url, input).subscribe(response=>{
		this.serverResponse = response as string[];
		this.msg = this.serverResponse.status;
		this.fname=""; this.lname=""; this.email=""; this.exp=""; this.ctc=""; this.ectc=""; this.mobile="";
	})
  }
  
  
  profileList:any[]=[];
  msg2:string;
  getprofile(clientid:string, status:string)
  {
	  this.msg2 = "Please wait..";
	  this.profileList=[];
	  var url = "https://www.firstenquiry.com/api/angular/userlist.php";
	  var input = {
					"hrid":this.tokenno,
					"clientid":clientid,
					"status":status
				  };
		this.obj.post(url, input).subscribe(response=>{
			this.profileList = response as string[];
			this.msg2= this.profileList.length + " Profile Found !";
		});
  }
  
  serverData;
  updateStatus(status:string , userid:number)
	{
		var url = "https://www.firstenquiry.com/api/angular/changeprofilestatus.php";
		  var input = {
						"hrid":this.tokenno,
						"userid":userid,
						"status":status,
						"clientid":this.companyid
					  };
		this.obj.post(url, input).subscribe(response=>{
			this.serverData = response as string[];
			this.msg2 = this.serverData.status;
			this.getprofile(this.companyid, this.blockName);// after changing status - reload available record
		})
	}
	
}









