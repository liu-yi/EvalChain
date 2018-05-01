var compiledContractDefinition = {"contracts": {"ECCMath": {"bin": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146060604052600080fd00a165627a7a72305820baedb03ef2afa90b37913e6e048d6fac7865afd994a56edf16ba8fc4a057c41b0029", "abi": []}, "RingSignature": {"bin": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146060604052600080fd00a165627a7a72305820957ba9bb6bec700452ea30b387c2319d411007e4860aa57be83421eb4bf3dcb70029", "abi": []}, "owned": {"bin": "0x6060604052341561000f57600080fd5b60008054600160a060020a033316600160a060020a03199091161790556101668061003b6000396000f30060606040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416638da5cb5b8114610050578063f2fde38b1461008c575b600080fd5b341561005b57600080fd5b6100636100ba565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b341561009757600080fd5b6100b873ffffffffffffffffffffffffffffffffffffffff600435166100d6565b005b60005473ffffffffffffffffffffffffffffffffffffffff1681565b6000543373ffffffffffffffffffffffffffffffffffffffff9081169116146100fe57600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff191673ffffffffffffffffffffffffffffffffffffffff929092169190911790555600a165627a7a723058208d1ccbc7efb42e671c014bc5df4a631cda1cb0a8bafafd437c1c3fb8ef5118e20029", "abi": [{"inputs": [], "constant": true, "name": "owner", "outputs": [{"type": "address", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [{"type": "address", "name": "newOwner"}], "constant": false, "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "payable": false, "type": "function"}, {"stateMutability": "nonpayable", "inputs": [], "type": "constructor", "payable": false}]}, "Evaluating": {"bin": "0x60606040526000805460a860020a60ff0219169055600a600455341561002457600080fd5b60008054600160a060020a03191633600160a060020a03161760a060020a60ff02191681556001600555612cb190819061005e90396000f30060606040526004361061015e5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166305c8d210811461016357806307c185211461018e57806314735303146101a45780631e85f051146102c35780632ae6f97d146102d95780632e7e5ec2146102f25780634178d145146103055780634d6ba6f314610341578063562cd5b4146103d3578063566a558d146103e957806357a70fdf146103fc578063580cbf5b1461040f578063588ee29b1461044b5780638da5cb5b1461045e578063915853b01461048d578063967553ac146104a3578063a39359b014610530578063a8aa1de414610543578063ae9ca59914610559578063c19d93fb1461056c578063c517cae0146105a3578063cbc46fcd146105b6578063cd28ae33146105c9578063cd2b8695146105df578063d7bb8087146105f2578063f2fde38b14610607578063fedc438f14610626575b600080fd5b341561016e57600080fd5b61017c600435602435610639565b60405190815260200160405180910390f35b341561019957600080fd5b61017c60043561066b565b34156101af57600080fd5b6102af600480359060446024803590810190830135806020601f82018190048102016040519081016040528181529291906020840183838082843782019150505050505091908035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919080359060200190919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190806040019060028060200260405190810160405280929190826002602002808284375093955061067d945050505050565b604051901515815260200160405180910390f35b34156102ce57600080fd5b6102af6004356108ae565b34156102e457600080fd5b61017c6004356024356108c3565b34156102fd57600080fd5b61017c6108f1565b341561031057600080fd5b61017c60046044816002604080519081016040528092919082600260200280828437509395506108f8945050505050565b341561034c57600080fd5b6102af600480359060446024803590810190830135806020818102016040519081016040528181529291906000602085015b828210156103bd57604080830286019060029080519081016040528092919082600260200280828437505050918352505060019091019060200161037e565b5093955050833593602001359250610950915050565b34156103de57600080fd5b61017c600435610b02565b34156103f457600080fd5b61017c610b14565b341561040757600080fd5b6102af610b1a565b341561041a57600080fd5b6102af6004604481600260408051908101604052809291908260026020028082843750939550610bd2945050505050565b341561045657600080fd5b6102af610c37565b341561046957600080fd5b610471610c59565b604051600160a060020a03909116815260200160405180910390f35b341561049857600080fd5b61017c600435610c68565b34156104ae57600080fd5b6104b9600435610c87565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156104f55780820151838201526020016104dd565b50505050905090810190601f1680156105225780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561053b57600080fd5b61017c610d42565b341561054e57600080fd5b61017c600435610d48565b341561056457600080fd5b61017c610d5a565b341561057757600080fd5b61057f610d60565b6040518082600281111561058f57fe5b60ff16815260200191505060405180910390f35b34156105ae57600080fd5b61017c610d70565b34156105c157600080fd5b61017c610d76565b34156105d457600080fd5b61017c600435610d7c565b34156105ea57600080fd5b61017c610d8e565b34156105fd57600080fd5b610605610d94565b005b341561061257600080fd5b610605600160a060020a0360043516610de8565b341561063157600080fd5b61017c610e32565b600780548390811061064757fe5b90600052602060002090600202018160028110151561066257fe5b01549150829050565b600b6020526000908152604090205481565b60008060018060005460a060020a900460ff16600281111561069b57fe5b146106a557600080fd5b6003544211156106eb576000805474ff000000000000000000000000000000000000000019167402000000000000000000000000000000000000000017815592506108a2565b600b6000856040518082604080838360005b838110156107155780820151838201526020016106fd565b5050505090500191505060405190819003902081526020810191909152604001600020541561074757600192506108a2565b61075087610e38565b600081815260086020526040902054909250151561077157600092506108a2565b6107ed886040518082805190602001908083835b602083106107a45780518252601f199092019160209182019101610785565b6001836020036101000a038019825116818451161790925250505091909101925060409150505180910390208a6040519081526020016040519081900390201888888888610e81565b1561089d57600c80546001810161080483826129fb565b506000918252602090912001899055600d8054600181016108258382612a24565b6000928352602090922001898051610841929160200190612a48565b5050600c54600b6000866040518082604080838360005b83811015610870578082015183820152602001610858565b505050509050019150506040519081900390208152602081019190915260400160002055600192506108a2565b600092505b50509695505050505050565b60096020526000908152604090205460ff1681565b6006602052816000526040600020818154811015156108de57fe5b6000918252602090912001549150829050565b6007545b90565b6000600a6000836040518082604080838360005b8381101561092457808201518382015260200161090c565b50505050905001915050604051908190039020815260208101919091526040016000205490505b919050565b60008080808060005460a060020a900460ff16600281111561096e57fe5b1461097857600080fd5b60005433600160a060020a0390811691161461099357600080fd5b6101f48811156109a65760009350610af7565b854211156109b75760009350610af7565b84600454870111156109cc5760009350610af7565b600092505b8651831015610a12576109f88784815181106109e957fe5b9060200190602002015161108e565b1515610a075760009350610af7565b6001909201916109d1565b60015460055460001901600090815260066020526040902054600290041015610ac157610aa4600660006001600554038152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015610a9a57602002820191906000526020600020905b815481526020019060010190808311610a86575b5050505050610e38565b600580546000838152600860205260409020819055600101905591505b6001888155600287905560038690556000805474ff0000000000000000000000000000000000000000191660a060020a17905593505b505050949350505050565b60086020526000908152604090205481565b6101f481565b600060018060005460a060020a900460ff166002811115610b3757fe5b14610b4157600080fd5b60005433600160a060020a03908116911614610b5c57600080fd5b6000547501000000000000000000000000000000000000000000900460ff161515610b9457600354421015610b945760009150610bce565b6000805474ff0000000000000000000000000000000000000000191674020000000000000000000000000000000000000000179055600191505b5090565b6000600b6000836040518082604080838360005b83811015610bfe578082015183820152602001610be6565b50505050905001915050604051908190039020815260208101919091526040016000205415610c2f5750600161094b565b50600061094b565b6000547501000000000000000000000000000000000000000000900460ff1681565b600054600160a060020a031681565b600c805482908110610c7657fe5b600091825260209091200154905081565b600d805482908110610c9557fe5b90600052602060002090016000915090508054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610d3a5780601f10610d0f57610100808354040283529160200191610d3a565b820191906000526020600020905b815481529060010190602001808311610d1d57829003601f168201915b505050505081565b60015481565b60009081526006602052604090205490565b600c5490565b60005460a060020a900460ff1681565b60035481565b60045481565b600a6020526000908152604090205481565b60055481565b60005433600160a060020a03908116911614610daf57600080fd5b6000805475ff00000000000000000000000000000000000000000019167501000000000000000000000000000000000000000000179055565b60005433600160a060020a03908116911614610e0357600080fd5b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b60025481565b60008160405180828051906020019060200280838360005b83811015610e68578082015183820152602001610e50565b5050505090500191505060405190819003902092915050565b6000610e8b612ac2565b610e93612ae8565b610e9b612ac2565b6000610ea5612ac2565b610ead612ac2565b610eb5612ac2565b7f79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f8179887527f483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8602088015260028c51811515610f0b57fe5b04604051805910610f195750595b908082528060200260200182016040525095508a86600081518110610f3a57fe5b60209081029091010152610f4d8c61137e565b9450600093505b60028c51811515610f6157fe5b04841015611079578b8460020281518110610f7857fe5b9060200190602002015183528b6002850260010181518110610f9657fe5b906020019060200201516020840152610fdb8a8581518110610fb457fe5b9060200190602002015188888781518110610fcb57fe5b90602001906020020151866113b5565b91506110138a8581518110610fec57fe5b906020019060200201518688878151811061100357fe5b906020019060200201518c6113b5565b9050600160028d5181151561102457fe5b04038410156110585761103a8c8a8f8585611417565b86856001018151811061104957fe5b6020908102909101015261106e565b6110658c8a8f8585611417565b8b14975061107e565b600190930192610f54565b600097505b5050505050505095945050505050565b600080808060005460a060020a900460ff1660028111156110ab57fe5b146110b557600080fd5b60005433600160a060020a039081169116146110d057600080fd5b6110d9846114f3565b15156110e85760009250611377565b60096000856040518082604080838360005b838110156111125780820151838201526020016110fa565b50505050905001915050604051908190039020815260208101919091526040016000205460ff16156111475760009250611377565b60055460001901600090815260066020526040902080546001810161116c83826129fb565b6000928352602083209092910190865190915550506005546000190160009081526006602052604090208054600181016111a683826129fb565b60009283526020832090929101908660016020020151909155505060078054600181016111d38382612afa565b916000526020600020906002020160006040805190810160405280885181526020018860016020020151905261120c9291506002612b26565b5050600160096000866040518082604080838360005b8381101561123a578082015183820152602001611222565b505050509050019150506040519081900390208152602081019190915260409081016000908120805460ff19169315159390931790925560055491600a918790518082604080838360005b8381101561129d578082015183820152602001611285565b505050509050019150506040519081900390208152602080820192909252604090810160009081209390935560015460055460001901845260069092529091205460029004141561137257611355600660006001600554038152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015610a9a5760200282019190600052602060002090815481526020019060010190808311610a86575050505050610e38565b600580546000838152600860205260409020819055600101905591505b600192505b5050919050565b611386612ac2565b61138e612ac2565b61139f61139a84610e38565b611504565b9050805182526020810151602083015250919050565b6113bd612ac2565b6113c5612b53565b6113cd612ac2565b6113e96113da88886115c0565b6113e487876115c0565b6119ec565b91506113fb826401000003d019611c55565b81518152602082015160208201529150815b5050949350505050565b6000858585858560405180868051906020019060200280838360005b8381101561144b578082015183820152602001611433565b5050505090500185600260200280838360005b8381101561147657808201518382015260200161145e565b5050505090500184815260200183600260200280838360005b838110156114a757808201518382015260200161148f565b5050505090500182600260200280838360005b838110156114d25780820151838201526020016114ba565b50505050905001955050505050506040519081900390209695505050505050565b60006114fe82611cbd565b92915050565b61150c612ac2565b600080600080600061151c612ac2565b60001988019550600094508493508392505b8315156115af57600195909501946401000003d01980876401000003d019898a090960070181151561155c57fe5b06915061156f826401000003d019611d4f565b94508415611596576401000003d01982066401000003d01986870903151561159657600193505b60018301925060648311156115aa576115af565b61152e565b948552505050602082015292915050565b6115c8612b53565b60008060006115d5612b6d565b6115dd612b53565b6115e5612b9b565b6401000003d0199550600080808b15156115fe576119dd565b6000604051985061020089016040525b8c156116465760018d16156116355750601f8c16808989015360206010821102818e03019c505b60028d049c5060018801975061160e565b506060604051908101604052808c5181526020018c600160200201518152600160209091015286526116788651611f1f565b9450611684858c61203a565b602087015261169b858760015b60200201516119ec565b60408701526116ac85876002611691565b60608701526116bd85876003611691565b60808701526116ce85876004611691565b60a08701526116df85876005611691565b60c08701526116f085876006611691565b60e087015260208601516040015184528880151561170a57fe5b84516040880151604001510960208501528880151561172557fe5b60208501516060880151604001510960408501528880151561174357fe5b60408501516080880151604001510960608501528880151561176157fe5b606085015160a0880151604001510960808501528880151561177f57fe5b608085015160c0880151604001510960a08501528880151561179d57fe5b60a085015160e0880151604001510960c085019081526117be90518a612266565b60e0850190815251610100850152888015156117d657fe5b61010085015160a0860151096101e0850152600692505b6002831061186a57888015156117ff57fe5b61010085015187600186016008811061181457fe5b602002015160400151096101008501528880151561182e57fe5b6101008501518560011986016010811061184457fe5b60200201510984600885016010811061185957fe5b6020020152600019909201916117ed565b8880151561187457fe5b61010085015160408801516040015109610120850152600092505b6007831015611907576118fc8660018501600881106118aa57fe5b60200201518560098601601081106118be57fe5b60200201518b8015156118cd57fe5b8760098801601081106118dc57fe5b60200201518860098901601081106118f057fe5b6020020151098c6122ff565b60019092019161188f565b60008711156119dd57600019808801978901015160001a91506119298a61232e565b601082111561198457506002601f8290030461197f8a604080519081016040528089856008811061195657fe5b602002015151815260200189856008811061196d57fe5b6020020151602001518d03905261243f565b6119d8565b60008211156119d8575060026000198201046119d88a60408051908101604052808985600881106119b157fe5b60200201515181526020018985600881106119c857fe5b602002015160200151905261243f565b611907565b50505050505050505092915050565b6119f4612b53565b60006119fe612bb6565b611a06612bb6565b60008080808060408b01511515611a1f57899850611c47565b60408a01511515611a32578a9850611c47565b6401000003d01997508760408c015160408d015109875287801515611a5357fe5b875160408d015109602088015287801515611a6a57fe5b60408b015160408c015109604088015287801515611a8457fe5b604088015160408c015109606088015260806040519081016040528089801515611aaa57fe5b60408a01518e5109815260200189801515611ac157fe5b60608a015160208f015109815260200189801515611adb57fe5b89518d5109815260200189801515611aef57fe5b60208a015160208e01510990529550604086015186511415611b2f576060860151602087015114611b1f57611c47565b611b288b611f1f565b9850611c47565b87801515611b3957fe5b86518903604088015108945087801515611b4f57fe5b60208701518903606088015108935087801515611b6857fe5b858609925087801515611b7757fe5b858409915087801515611b8657fe5b82890389801515611b9357fe5b86870908905087801515611ba357fe5b88801515611bad57fe5b89801515611bb757fe5b8589510960020989038208808a52905087801515611bd157fe5b88801515611bdb57fe5b828a038a801515611be857fe5b868a510908850960208a015287801515611bfe57fe5b88801515611c0857fe5b83602089015109890360208b01510860208a015287801515611c2657fe5b88801515611c3057fe5b60408c015160408e01510986098960025b60200201525b505050505050505092915050565b600080611c66604085015184612266565b915082801515611c7257fe5b828309905082801515611c8157fe5b81855109845282801515611c9157fe5b83801515611c9b57fe5b8284098560015b60200201510960208501525050600160409092019190915250565b60006401000003d019818084511580611cd65750828551145b80611ce357506020850151155b80611cf15750826020860151145b15611cff5760009350611d47565b82801515611d0957fe5b6020860151602087015109915082801515611d2057fe5b600784801515611d2c57fe5b875186801515611d3857fe5b89518a51090908905080821493505b505050919050565b6000806000806000611d5f612b53565b6000611d69612ac2565b8996508895508660001115611d815760009750611f12565b6002861015611d935760009750611f12565b8587811515611d9e57fe5b069650861515611db15760009750611f12565b8560021415611dc257869750611f12565b611dcc8787612659565b9450846000191415611de15760009750611f12565b6004860660031415611e0657611dff876004600189015b048861273e565b9750611f12565b6008860660051415611e7c57611e228760046000198901611df8565b93508360011415611e3c57611dff87600860038901611df8565b60018603841415611e735785611e5d6004890260086004198401048961273e565b8860020202811515611e6b57fe5b069750611f12565b60009750611f12565b600291505b85821015611f0d57611e9a876004028384020387612659565b6000191415611f025760606040519081016040528088815260200183600003815260200160018152509250611eec604080519081016040526000815260016020820181905260029089010485896127f0565b905060208101511515611e735780519750611f12565b600190910190611e81565b600097505b5050505050505092915050565b611f27612b53565b6401000003d0196000808080808060408901511515611f455761202e565b885195506020890151945086801515611f5a57fe5b858609935086801515611f6957fe5b87801515611f7357fe5b858809600409925086801515611f8557fe5b87801515611f8f57fe5b878809600309915086801515611fa157fe5b87801515611fab57fe5b848508880388801515611fba57fe5b84850908808952905086801515611fcd57fe5b87801515611fd757fe5b88801515611fe157fe5b868709600809880388801515611ff357fe5b89801515611ffd57fe5b848b03870885090860208901528680151561201457fe5b8780151561201e57fe5b60408b0151870960020960408901525b50505050505050919050565b612042612b53565b600061204c612ac2565b612054612bb6565b60008080808060408b01511515612091576060604051908101604052808b5181526020018b60016020020151815260200160018152509850611c47565b60208a015115156120a4578a9850611c47565b6401000003d01997508760408c015160408d0151098752878015156120c557fe5b875160408d01510960208801526080604051908101604052808c5181526020018c600160200201518152602001898015156120fc57fe5b89518d510981526020018980151561211057fe5b60208a015160208e01510990529550604086015186511415612160576060860151602087015114612151576000808c5260208c0181905260408c0152611c47565b61215a8b611f1f565b50611c47565b8780151561216a57fe5b8651890360408801510894508780151561218057fe5b6020870151890360608801510893508780151561219957fe5b8586099250878015156121a857fe5b8584099150878015156121b757fe5b828903898015156121c457fe5b868709089050878015156121d457fe5b888015156121de57fe5b898015156121e857fe5b8589510960020989038208808a5290508780151561220257fe5b8880151561220c57fe5b828a038a80151561221957fe5b868a510908850960208a01528780151561222f57fe5b8880151561223957fe5b83602089015109890360208b01510860208a01528780151561225757fe5b60408c01518609896002611c41565b60008282828080808086158061227b57508587145b80612284575085155b1561228e57600080fd5b858711156122a55785878115156122a157fe5b0696505b600193508592508691505b81156122db5781838115156122c157fe5b9495940485810290940393919283830290039190506122b0565b60008512156122f1578460000386039750611f12565b509298975050505050505050565b8080151561230957fe5b8285510984528080151561231957fe5b8180151561232357fe5b838509856001611ca2565b6401000003d019600080808080806040880151151561234c57612435565b87519550602088015194508680151561236157fe5b85860993508680151561237057fe5b8780151561237a57fe5b85880960040992508680151561238c57fe5b8780151561239657fe5b8788096003099150868015156123a857fe5b878015156123b257fe5b8485088803888015156123c157fe5b848509088089529050868015156123d457fe5b878015156123de57fe5b888015156123e857fe5b8687096008098803888015156123fa57fe5b8980151561240457fe5b848b03870885090860208901528680151561241b57fe5b8780151561242557fe5b60408a0151870960020960408901525b5050505050505050565b6000612449612ac2565b612451612bb6565b60008080808060208a015115156124805788518a52602089015160208b015260018a60025b602002015261264d565b602089015115156124905761264d565b6401000003d01997508760408b015160408c0151098752878015156124b157fe5b875160408c01510960208801526080604051908101604052808b5181526020018b600160200201518152602001898015156124e857fe5b89518c51098152602001898015156124fc57fe5b60208a015160208d0151099052955060408601518651141561254957606086015160208701511461253b576000808b5260208b018190528a6002612476565b6125448a61232e565b61264d565b8780151561255357fe5b8651890360408801510894508780151561256957fe5b6020870151890360608801510893508780151561258257fe5b85860992508780151561259157fe5b8584099150878015156125a057fe5b828903898015156125ad57fe5b868709089050878015156125bd57fe5b888015156125c757fe5b898015156125d157fe5b8589510960020989038208808b529050878015156125eb57fe5b888015156125f557fe5b828a038a80151561260257fe5b868a510908850960208b01528780151561261857fe5b8880151561262257fe5b83602089015109890360208c01510860208b01528780151561264057fe5b60408b0151860960408b01525b50505050505050505050565b60008282828080838581151561266b57fe5b06945084151561267e5760009550612733565b84600114156126905760019550612733565b849250600091505b6002830615156126b357600283049250816001019150612698565b5060006002820615806126c95750600884066001145b806126d75750600884066007145b156126e4575060016126e9565b506000195b82600114156126fa57809550612733565b6004840660031480156127105750600483066003145b15612719576000035b61272e838581151561272757fe5b0684612659565b810295505b505050505092915050565b60008084151561275157600091506127e8565b83151561276157600191506127e8565b82151561276d57600080fd5b50600190507f80000000000000000000000000000000000000000000000000000000000000005b80156127e857828185161515860a84848509099150826002820485161515860a84848509099150826004820485161515860a84848509099150826008820485161515860a8484850909915060109004612794565b509392505050565b6127f8612ac2565b612800612ac2565b600083861115612825576040805190810160405260008082526020820152925061140d565b851515612847576040805190810160405260018082526020820152925061140d565b8651825260208701516020830152508460018181161415612875578151835260208201516020840152612891565b604080519081016040526001815260006020820152925061140d565b600181111561140d57600290046128aa828087876128cc565b915060028106600114156128c7576128c4828487876128cc565b92505b612891565b6128d4612ac2565b6128dc612b53565b600080606060405190810160405280600081526020016000815260200160008152509250600091505b6002821015612983575060005b6002811015612978578487826002811061292857fe5b602002015189846002811061293957fe5b602002015102848484016003811061294d57fe5b60200201510181151561295c57fe5b06838383016003811061296b57fe5b6020020152600101612912565b600190910190612905565b61298e83878761299a565b98975050505050505050565b6129a2612ac2565b6040840151156129f4578160208401516040860151026020860151038115156129c757fe5b0660208501528183516040860151028551038115156129e257fe5b06845283518152602084015160208201525b9392505050565b815481835581811511612a1f57600083815260209020612a1f918101908301612bd0565b505050565b815481835581811511612a1f57600083815260209020612a1f918101908301612bea565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10612a8957805160ff1916838001178555612ab6565b82800160010185558215612ab6579182015b82811115612ab6578251825591602001919060010190612a9b565b50610bce929150612bd0565b604080519081016040526002815b6000815260200190600190039081612ad05790505090565b60206040519081016040526000815290565b815481835581811511612a1f57600202816002028360005260206000209182019101612a1f9190612c0d565b8260028101928215612ab65791602002820182811115612ab6578251825591602001919060010190612a9b565b606060405190810160405260008152600260208201612ad0565b6103006040519081016040526008815b612b85612b53565b815260200190600190039081612b7d5790505090565b61020060405190810160405260008152600f60208201612ad0565b608060405190810160405260008152600360208201612ad0565b6108f591905b80821115610bce5760008155600101612bd6565b6108f591905b80821115610bce576000612c048282612c30565b50600101612bf0565b6108f591905b80821115610bce576000612c278282612c77565b50600201612c13565b50805460018160011615610100020316600290046000825580601f10612c565750612c74565b601f016020900490600052602060002090810190612c749190612bd0565b50565b5060008155600101600090555600a165627a7a723058204d9edc248be276288cfe0bd38c019abbb21ed248c08d1dc413c39e8d13fbc6fd0029", "abi": [{"inputs": [{"type": "uint256", "name": ""}, {"type": "uint256", "name": ""}], "constant": true, "name": "evaluators", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [{"type": "bytes32", "name": ""}], "constant": true, "name": "registeredEvalLink", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [{"type": "bytes32", "name": "evalChoice"}, {"type": "string", "name": "evalComment"}, {"type": "uint256[]", "name": "pubKeys"}, {"type": "uint256", "name": "c_0"}, {"type": "uint256[]", "name": "signature"}, {"type": "uint256[2]", "name": "link"}], "constant": false, "name": "Evaluate", "outputs": [{"type": "bool", "name": ""}], "stateMutability": "nonpayable", "payable": false, "type": "function"}, {"inputs": [{"type": "bytes32", "name": ""}], "constant": true, "name": "registeredKeys", "outputs": [{"type": "bool", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [{"type": "uint256", "name": ""}, {"type": "uint256", "name": ""}], "constant": true, "name": "ring", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [], "constant": true, "name": "getNumRegisterEvaluators", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [{"type": "uint256[2]", "name": "pubKey"}], "constant": true, "name": "getRingIdx", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [{"type": "uint256", "name": "_numEvaluatorPerRing"}, {"type": "uint256[2][]", "name": "_publicKeys"}, {"type": "uint256", "name": "_evaluatingStartTime"}, {"type": "uint256", "name": "_evaluatingEndTime"}], "constant": false, "name": "finishSetUp", "outputs": [{"type": "bool", "name": ""}], "stateMutability": "nonpayable", "payable": false, "type": "function"}, {"inputs": [{"type": "uint256", "name": ""}], "constant": true, "name": "hashRingToIdx", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [], "constant": true, "name": "maxNumberEvaluatorsPerRing", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [], "constant": false, "name": "endEvaluatingPhase", "outputs": [{"type": "bool", "name": ""}], "stateMutability": "nonpayable", "payable": false, "type": "function"}, {"inputs": [{"type": "uint256[2]", "name": "link"}], "constant": true, "name": "queryLink", "outputs": [{"type": "bool", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [], "constant": true, "name": "debug", "outputs": [{"type": "bool", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [], "constant": true, "name": "owner", "outputs": [{"type": "address", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [{"type": "uint256", "name": ""}], "constant": true, "name": "evalChoices", "outputs": [{"type": "bytes32", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [{"type": "uint256", "name": ""}], "constant": true, "name": "evalComments", "outputs": [{"type": "string", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [], "constant": true, "name": "numEvaluatorPerRing", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [{"type": "uint256", "name": "ringIdx"}], "constant": true, "name": "getRingSize", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [], "constant": true, "name": "getNumberEvaluations", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [], "constant": true, "name": "state", "outputs": [{"type": "uint8", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [], "constant": true, "name": "evaluatingEndTime", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [], "constant": true, "name": "minimumPhaseTime", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [{"type": "bytes32", "name": ""}], "constant": true, "name": "hashKeyToRingIdx", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [], "constant": true, "name": "currentRingIdx", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"inputs": [], "constant": false, "name": "setDebug", "outputs": [], "stateMutability": "nonpayable", "payable": false, "type": "function"}, {"inputs": [{"type": "address", "name": "newOwner"}], "constant": false, "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "payable": false, "type": "function"}, {"inputs": [], "constant": true, "name": "evaluatingStartTime", "outputs": [{"type": "uint256", "name": ""}], "stateMutability": "view", "payable": false, "type": "function"}, {"stateMutability": "nonpayable", "inputs": [], "type": "constructor", "payable": false}]}, "Secp256k1": {"bin": "0x604c602c600b82828239805160001a60731460008114601c57601e565bfe5b5030600052607381538281f30073000000000000000000000000000000000000000030146060604052600080fd00a165627a7a72305820b5bac5d8c04a5954b714ca5ea7c66bd3918b15aa035767b3694ccf52da2e42330029", "abi": []}}, "version": "0.4.21+commit.dfe3193c.Windows.msvc"};