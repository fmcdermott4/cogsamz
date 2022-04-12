const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { AMM2, COGS, FunctionTest, SubmittedLpn, User } = require("../models");
const { signToken } = require("../util/auth");
const { dateScalar } = require("./customScalars");

const resolvers = {
  Date: dateScalar,
  Query: {
    AMM2: async () =>{
      return await AMM2.find({});
    },        
    BillCodes: async () =>{
        return await COGS.find({});
    }, 
    BillCode: async (parent, {BillCode})=>{
        return await COGS.findOne({BillCode:BillCode})
    },
    FunctionTests: async (parent, args)=>{
      return await FunctionTest.find({}).populate("LPN Test.User");
    },   
    LPN: async (parent, {LPN}) =>{
        return await AMM2.findOne({LPN:LPN});
    },
    me: async (parent, args, ctx) => {
      // if ctx.user is undefined, then no token or an invalid token was
      // provided by the client.
      if (!ctx.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      return User.findOne({ email: ctx.user.email });
    },
    submittedLpn: async (parent, args)=>{
      const {LPN} = await args;
      return await SubmittedLpn.findOne({LPN:LPN}).populate('LPN User');
    },
    submittedLPNs: async (parent, args)=>{
      const params = {};
      if(args.minDate){
        params.minDate = args.minDate
      }else{
        params.minDate = new Date(1549355954277)};
      if(args.maxDate){
        params.maxDate = args.maxDate
      }else{
        params.maxDate = new Date()}
      if(args.subcategory){
        let data = await SubmittedLpn.find({SubmittedDate:{$gte:params.minDate, $lte:params.maxDate}}).populate('LPN User');
        let i = data.length;
        while(i--){
          if(!(data[i].LPN.Subcategory.toLowerCase()).includes(args.subcategory.toLowerCase())){
            data.splice(i,1)
          }
          
        }
        return(data);
      }else{
        return await SubmittedLpn.find({SubmittedDate:{$gte:params.minDate, $lte:params.maxDate}}).populate('LPN User');
      }
    }
  },
  Mutation: {
    upsertFunctionTest: async (parent, args)=>{      
      return await AMM2.findOne({LPN:args.LPN}, (err, data)=>{
        FunctionTest.findOneAndUpdate({LPN:data._id},{LPN:data._id, Pass:args.Pass, $push:{Test:args.Test}}, {new:true, upsert:true, setDefaultsOnInsert: true}, (err, data)=>{if(err){console.log(err)}})
      })
    },
    upsertSubmittedLpn: async (parent,args)=>{
      const {LPN} = await args;
      const updatedLpn =  await SubmittedLpn.findOneAndUpdate({LPN:LPN}, {...args}, {new:true, upsert:true, setDefaultsOnInsert: true});            
      updatedLpn.SubmittedDate = Date.now();
      await updatedLpn.save();
      return updatedLpn;
    },
    createUser: async (parent, args) => {
      try {
        const user = await User.create({ ...args });
        const token = await signToken(user);
        return { user, token };
      } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
          const [[key, value]] = Object.entries(error.keyValue);
          throw new UserInputError(`${key} "${value}" already exists.`);
        }
        throw error;
      }
    },
    login: async (parent, args) => {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid username or password");
      }
      const authentic = await user.isCorrectPassword(password);
      if (!authentic) {
        throw new AuthenticationError("Invalid username or password");
      }
      const token = await signToken(user);
      user.lastLogin = Date.now();
      await user.save();
      return { token, user };
    },
  }
};

module.exports = resolvers;
