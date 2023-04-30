import { IS_PUBLIC_KEY } from "@/decorator/public.decorator";
import { ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(JwtAuthGuard.name);
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(), //create
            context.getClass(),  //CatsController
            // 이렇게하면 controller 단위로 적용해도 catch한다.
            // getAllAndOverride는 controller의 메타데이터를 기본으로하고 선택적으로 재정의됨
            // getAllAndMerge는 handler와 class 둘 다 array로 들어옴
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
}