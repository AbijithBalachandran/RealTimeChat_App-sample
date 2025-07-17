import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatApp-frontend';
  isJoined = false
  socket = inject(Socket);

  name:string="";
  message:string =  "";

  messages:{name:string,message:string}[]=[];

  ngOnInit(){
    this.socket.on('chat-received',(data:any)=>{
      console.log('chat-recieved',data);
      this.messages.push(data);
    })
  }

  join(){ 
    this.isJoined = true;
    console.log('join',this.name);
    this.socket.emit('join',this.name)
  }

  send(){
    console.log('send',this.message);
    this.socket.emit('chat',{name:this.name,message:this.message});
    this.message = '';
  }
}
