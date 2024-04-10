

export interface ICoudinalyRepository {
    uploadImage(file:Express.Multer.File):Promise<any>
}