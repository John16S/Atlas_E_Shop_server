import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakePaymentDto } from './dto/makePayment.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { MakePaymentResponse } from './types/file';
import { CheckPaymentDto } from './dto/check-payment.dto';

@Controller('payment')
export class PaymentController {
    constructor(private paymentServic: PaymentService){}

    //!Метод для платежа
    @ApiOkResponse( {type: MakePaymentResponse} )
    @UseGuards(AuthenticatedGuard)
    @Post()     //* URL (/payment)
    makePayment(@Body() makePaymentDto: MakePaymentDto){
        return this.paymentServic.makePayment(makePaymentDto);
    }

    //!Метод для проверки что платёж успешно прошел
    @UseGuards(AuthenticatedGuard)
    @Post('/info')
    checkPayment(@Body() checkPaymentDto: CheckPaymentDto) {
        return this.paymentServic.checkPayment(checkPaymentDto);
    }
}
