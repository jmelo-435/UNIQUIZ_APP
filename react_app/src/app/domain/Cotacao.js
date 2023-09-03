import { getCotation } from "../interfaces/interface";

export class Cotacao {
    constructor(doc_entry) {
        this.doc_entry = doc_entry;
        this.token = localStorage.getItem('helsten_token');
        
    }

    async getCotation() {
        let returnObject = {
            pessoaDeContato: '',
            numeroDeDocumento: '',
            dataDeValidade: '',
            dataDeLancamento: '',
            vendedorExterno: '',
            classificacaoABC: '',
            status: '',
            cidadeDeFaturamento: '',
            estadoDeFaturamento: '',
            condicaoDePagamento: '',
            usoPrincipal: '',
            impostos: [],
            itens: [],
        };
        
        

        try{
            const response = await getCotation(this.doc_entry, this.token);
            const dados = response.data.data.dados[0];
            const listaItens  = response.data.data.itens;
            const listaImpostos = response.data.data.impostos;
            if (response.status === 200 ){
                returnObject.numeroDeDocumento = dados.DocNum;
                returnObject.dataDeValidade = dados.DocDueDate;
                returnObject.dataDeLancamento = dados.DocDate;
                returnObject.vendedorExterno = dados.SlpName;
                returnObject.classificacaoABC = dados.U_Hls_Class_ABC;
                returnObject.status = dados.DocStatus;
                returnObject.cidadeDeFaturamento = dados.CityB;
                returnObject.estadoDeFaturamento = dados.StateB;
                returnObject.condicaoDePagamento = dados.PymntGroup;
                returnObject.usoPrincipal = dados.Usage;
                returnObject.pessoaDeContato = dados.Name;

                listaItens.map((returnedItem) => {

                    let item ={
                        codigo: '',
                        descricao: '',
                        ncm: '',
                        catalogoDoPN: '',
                        quantidade: '',
                        motivoDeEncerramento: '',
                        precoUnitario: '',
                        quantidadeMinima: '',
                        quantidadeDisponivel: '',
                        custo: '',
                        formacaoDePreco: '',
                        ilvStatus: '',
                        leadTime: '',
                        dataDeEntrega: '',
                        vendedorInterno: '',
                        utilizacao: '',
                        numeroPedidoDoCliente: '',
                        numeroDaLinhaDoPedidoDoCliente: '',        
                    }

                    item.codigo = returnedItem.ItemCode;
                    item.descricao = returnedItem.Dscription;
                    item.ncm = returnedItem.U_NCM;
                    item.catalogoDoPN = returnedItem.SubCatNum;
                    item.quantidade = returnedItem.Quantity;
                    item.motivoDeEncerramento = returnedItem.U_OKS_MotEncerra;
                    item.precoUnitario = returnedItem.Price;
                    item.quantidadeMinima = returnedItem.U_Hls_Qtd_Minima;
                    item.quantidadeDisponivel = returnedItem.U_Hls_Estoque_01;
                    item.custo = returnedItem.U_UDF_CustoUnit;
                    item.formacaoDePreco = returnedItem.U_OKS_FP_Preco;
                    item.ilvStatus = returnedItem.U_UDF_ILV_Status;
                    item.leadTime = returnedItem.U_LeadTime;
                    item.dataDeEntrega = returnedItem.ActDelDate;
                    item.vendedorInterno = returnedItem.U_Hls_Vend_Int;
                    item.utilizacao = returnedItem.Usage;
                    item.numeroPedidoDoCliente = returnedItem.U_OKS_NPDCliente;
                    item.numeroDaLinhaDoPedidoDoCliente = returnedItem.U_OKS_NLinhaPDClie;
                    returnObject.itens.push(item);
                })

                listaImpostos.map((returnedImposto) => {

                    let imposto = {
                        nome: '',
                        valor: '',
                    }
                    imposto.nome = returnedImposto.Name;
                    imposto.valor = returnedImposto.TOTAL;
                    returnObject.impostos.push(imposto);
                }

                )
                return {sucess: true, data: returnObject}
            }

        }
        catch(error){
            return {sucess: false, error: error}
        }
    }
}