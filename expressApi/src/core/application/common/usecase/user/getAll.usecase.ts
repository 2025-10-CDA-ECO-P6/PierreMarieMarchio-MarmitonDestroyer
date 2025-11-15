import {
  QueryContext,
  UserRepository,
} from '../../../../domain/common/interfaces';
import { UserFullDTO } from '../../dto';
import { MetaDTO } from '../../dto/MetaDTO';
import { UseCase } from '../../interfaces';

export interface GetUsersResponse {
  data: UserFullDTO[];
  meta: MetaDTO;
}

export class GetAllUsersUseCase
  implements UseCase<QueryContext, { data: UserFullDTO[]; meta: any }>
{
  constructor(private readonly userRepo: UserRepository) {}

  async execute(
    ctx: QueryContext,
  ): Promise<{ data: UserFullDTO[]; meta: any }> {
    const result = await this.userRepo.findAll(ctx);

    const pageSize = ctx.getLimit() ?? 25;
    const offset = ctx.getOffset() ?? 0;
    const page = offset / pageSize + 1;
    const pageCount = Math.ceil(result.total / pageSize);

    return {
      data: result.items.map((u) => this.toFullDTO(u)),
      meta: {
        page,
        pageSize,
        pageCount,
        total: result.total,
      },
    };
  }

  private toFullDTO(user: any): UserFullDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
