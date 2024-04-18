export interface IDocxtemplateRepository{
    generateWord(data: any): Promise<string> 
}