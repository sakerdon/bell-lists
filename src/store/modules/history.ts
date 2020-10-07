import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store';

interface LogInterface {
  date: Date;
  id: number;
  name: string;
  direction: string;
}

export interface LogStateInterface {
  logs: LogInterface[];
}

@Module({ dynamic: true, store, name: 'historyLog' })
class Log extends VuexModule implements LogStateInterface {
  public logs: LogInterface[] = [];

  @Mutation
  private ADD_LOG(log: LogInterface) {
    this.logs.push(log);
  }

  @Action
  public AddLog(log: LogInterface) {
    this.ADD_LOG(log);
  }
}

export const HistoryModule = getModule(Log);
