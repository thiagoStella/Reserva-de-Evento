import { LightningElement } from 'lwc';
import inserirReserva from '@salesforce/apex/ReservaController.inserirReserva';
import showToast from 'lightning/toast';
export default class ReservaDeEvento extends LightningElement {
    nome = '';
    data = '';
    participantes = '';
    valor = 0;
    total = 0;

    mudarValor(event){
    let name = event.target.name;
    let value = event.target.value;
        switch(name){
            case 'nome':
                this.nome = value;
                break;
            case 'data':
                this.data = value;
                break;
            case 'participantes':
                this.participantes = value;
                this.total = this.participantes * this.valor
                break;
            case 'valor':
                this.valor = value;
                this.total = 'R$ ' + this.participantes * this.valor

                break;
        }
    }

    enviarDados(event){
        event.preventDefault();
        let dados = {
            'NomeDoCliente__c' : this.nome,
            'DataDoEvento__c' : this.data,
            'NumeroDeParticipantes__c' : this.participantes,
            'ValorPorParticipante__c' : this.valor,
            'ValorTotalDaReserva__c' : this.total
        }
        inserirReserva({reserva: dados}).then(() => {
            this.limparCampos();
            this.mostrarNotificacao('Registro adicionado', 'Evento cadsatrado com sucesso','success');
        }).catch(error =>{
            this.limparCampos();
            this.mostrarNotificacao('Erro ao registrar','Ocorreu um erro durante o registro do evento, tente novamente','error');
        });

    }
    mostrarNotificacao(titulo,menssagem,tipo){
        showToast.show({
            label: titulo,
            message: menssagem,
            variant: tipo
        });
    }
    limparCampos(){
        this.nome = '';
        this.data = '';
        this.participantes = '';
        this.valor = 0;
        this.total = '';
    }
}