import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function VerifyAuthentication(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization

    if(authToken){
        const [, token] = authToken.split(" ")
        try{
            const { sub } = verify(token, process.env.TOKEN_SECRET_KEY as string) as { sub: string };
            (request as any).id_user = sub;
            return next()

        } catch (error){
            response.status(401).json({message: "Token inválido"})
        }
      
    }
     response.status(401).json({message: "Token inválido"})
}