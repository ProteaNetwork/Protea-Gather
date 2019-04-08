import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Modules, Schemas } from 'src/app.constants';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommunityDocument } from './community.schema';
import { CommunityDTO } from './dto/community.dto';
import { AttachmentService } from 'src/attachments/attachment.service';

@Injectable()
export class CommunityService {
  constructor(
    @Inject(Modules.Logger) logger,
    @InjectModel(Schemas.Community) private readonly communityRepository: Model<CommunityDocument>,
    private readonly attachmentService: AttachmentService){

  }

  async getCommunityByTbcAddress(tbcAddress: string): Promise<CommunityDocument> {
    const doc = await this.communityRepository.findOne({tbcAddress});
    // DEBUG used only in populating new instances
    // if(!doc){
    //   const communityDoc = await new this.communityRepository({
    //     tbcAddress: tbcAddress,
    //     membershipManager: "0x4Ce301a9F7a83C9bFAE3a4F06ad2Fe5404c62430",
    //     eventManager: "0x65464728B4fbfCEe4C4dEA20edeDce5CDAF913BE",
    //     name: "community",
    //     tokenSymbol: "COM",
    //   });
    //   communityDoc.save();
      // return communityDoc.toObject();
    // }
    return doc ? doc.toObject() : false;
  }

  async createCommunity(createData: CommunityDTO, bannerImage): Promise<CommunityDocument | HttpException>{
    const communityDoc = await new this.communityRepository(createData);
    const attachment = await this.attachmentService.create({
      filename: `${createData.tbcAddress}-${bannerImage.originalname}`,
      contentType: bannerImage.mimetype
    }, bannerImage);
    communityDoc.bannerImage = attachment;

    communityDoc.save();
    return communityDoc.toObject();
  }

  async updateCommunity(communityData: CommunityDTO): Promise<CommunityDocument>{
    const doc = await this.communityRepository.findOne({tbcAddress: communityData.tbcAddress});
    Object.keys(communityData).forEach(key => {
      doc[key] = communityData[key];
    });

    doc.save();
    return doc.toObject();
  }
}
