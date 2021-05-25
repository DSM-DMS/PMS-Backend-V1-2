import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ClubService } from "./club/club.service";
import {
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiConsumes,
  ApiResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "../shared/authentication/auth.guard";
import { ClubInfoResObj, ClubListResObj } from "./club/dto/club.dto";

@ApiTags("introduce")
@ApiBearerAuth()
@ApiHeader({ name: "Authorization", required: true })
@Controller("introduce")
export class IntroduceController {
  constructor(private clubService: ClubService) {}

  @Get("/clubs")
  @ApiOperation({
    summary: "동아리 API",
    description: "동아리 정보를 객체로 반환",
  })
  @ApiResponse({ status: 200, type: [ClubListResObj] })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiConsumes("application/json")
  getClubList() {
    return this.clubService.getClubList();
  }

  @Get("/clubs/:clubname")
  @UseGuards(new AuthGuard())
  @ApiOperation({
    summary: "동아리 리스트 API",
    description: "동아리 리스트 목록을 객체로 반환",
  })
  @ApiResponse({ status: 200, type: ClubInfoResObj })
  @ApiResponse({ status: 400, description: "잘못된 요청. 요청 값 확인" })
  @ApiResponse({ status: 401, description: "인증 정보가 유효하지 않음" })
  @ApiConsumes("application/json")
  getClubInfo(@Param("clubname") clubname: string) {
    if (!clubname) {
      throw new BadRequestException("Invalid Parameter");
    }
    return this.clubService.getClubInfo(clubname);
  }
}
